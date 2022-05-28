using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Persistance;

namespace Application.Activities
{
    public class EditActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            //insert properties
            [FromForm(Name = "File")]
            public IFormFile File { get; set; }
            [FromForm(Name = "Activity")]
            public string Activity { get; set; }

            public Guid InputId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly ILogger<EditActivity> _logger;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor, ILogger<EditActivity> logger,
            IMapper mapper)
            {
                _logger = logger;
                _mapper = mapper;
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (!(request.Activity.Length > 0)) return null;

                Photo photo = null;

                try
                {
                    var newActivityDto = JsonConvert.DeserializeObject<ActivityDetailsDto>(request.Activity);

                    if (newActivityDto.AttendeeCountMax > 5) return Result<Unit>.Failure("Error : Attendee Count Max exceeded 5");

                    if (newActivityDto.Id != request.InputId) return Result<Unit>.Failure("Recieved incorrect activity id");

                    var activity = await _context.Activities
                    .AsQueryable()
                    .Include(a => a.Tag).ThenInclude(at => at.Tag)
                    .Include(a => a.Categories).ThenInclude(ac => ac.Categories)
                    .SingleOrDefaultAsync(
                        a => a.Id == newActivityDto.Id,
                            cancellationToken: cancellationToken
                    );

                    if (activity == null)
                        return null;

                    var user = await _context.Users
                        .Include(p => p.Photos)
                        .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername(), cancellationToken: cancellationToken);

                    if (user == null) return null;

                    if (request.File != null)
                    {
                        var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                        photo = new Photo
                        {
                            Url = photoUploadResult.Url,
                            Id = photoUploadResult.PublicId,
                            IsForActivity = true,
                            IsMain = false
                        };

                        activity.Picture = photo;
                        activity.ImageUrl = photo.Url;
                    }

                    var dtoCategoriesArray = newActivityDto.Categories.Select(c => c.Name).ToArray();

                    var entityCategoriesArray = activity.Categories.Select(c => c.Categories.Name).ToArray();

                    var categoriesToAdd = dtoCategoriesArray.Except(entityCategoriesArray);

                    var categoriesToRemove = entityCategoriesArray.Except(dtoCategoriesArray);

                    if (categoriesToAdd.Any() || categoriesToRemove.Any())
                    {
                        var categories = await _context.Categories.AsQueryable().Where(
                                               c => categoriesToAdd.Contains(c.Name) || categoriesToRemove.Contains(c.Name)
                                           ).ToListAsync(cancellationToken: cancellationToken);

                        foreach (var category in categories)
                        {
                            if (categoriesToAdd.Contains(category.Name))
                            {
                                activity.Categories.Add(new ActivityCategories
                                {
                                    Categories = category,
                                    CategoriesId = category.Id,
                                    Activity = activity,
                                    ActivityId = activity.Id
                                });
                            }
                            if (categoriesToRemove.Contains(category.Name))
                            {
                                var categoriesAfterRemoval =
                                activity.Categories.Where(c => c.Categories.Name != category.Name);

                                activity.Categories = categoriesAfterRemoval.ToList();
                            }
                        }
                    }

                    var dtoTagArray = newActivityDto.Tag.Select(c => c.Name).ToArray();

                    var entityTagArray = activity.Tag.Select(t => t.Tag.Name).ToArray();

                    var tagsToAdd = dtoTagArray.Except(entityTagArray);

                    var tagsToRemove = entityTagArray.Except(dtoTagArray);

                    // if (tagsToAdd.Any())
                    // {
                    //     foreach (var tag in tagsToAdd)
                    //     {
                    //         activity.Tag.Add(new ActivityTag
                    //         {
                    //             Tag = new Tag
                    //             {
                    //                 Name = tag,
                    //             },
                    //             Activity = activity
                    //         });
                    //     }

                    // }

                    if (tagsToAdd.Any() || tagsToRemove.Any())
                    {
                        var tag = await _context.Tags.AsQueryable().Where(
                                                c => tagsToAdd.Contains(c.Name) || tagsToRemove.Contains(c.Name)
                                            ).ToListAsync(cancellationToken: cancellationToken);
                        foreach (var tagToAdd in tagsToAdd)
                        {
                            if (tag.Any(t => t.Name == tagToAdd))
                            {
                                activity.Tag.Add(
                                    new ActivityTag
                                    {
                                        Tag = tag.SingleOrDefault(t => t.Name == tagToAdd),
                                        Activity = activity
                                    })
                                    ;
                            }
                            if (!tag.Any(t => t.Name == tagToAdd))
                            {
                                activity.Tag.Add(
                                    new ActivityTag
                                    {
                                        Tag = new Tag
                                        {
                                            Name = tagToAdd,
                                        },
                                        Activity = activity
                                    })
                                    ;
                            }
                        }

                        foreach (var tagToRemove in tagsToRemove)
                        {
                            if (tag.Any(t => t.Name == tagToRemove))
                            {
                                var tagsAfterRemoval =
                                activity.Tag.Where(t => t.Tag.Name != tagToRemove);

                                activity.Tag = tagsAfterRemoval.ToList();
                            }
                        }
                    }

                    activity = _mapper.Map(newActivityDto, activity);

                    bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var res = new Result<Unit>();

                    if (!result) return Result<Unit>.Failure("An error occured while editing the Activity.");

                    return Result<Unit>.Success(Unit.Value);

                }
                catch (Exception e)
                {
                    _logger.LogError("Error Occured editing activity {a} and {b} for user: {c}",
                         e.Message.ToString(),
                         e.InnerException.ToString(),
                         _userAccessor.GetUsername() ?? "Unknown User");

                    return Result<Unit>.Failure("An error occured while editing the Activity.");
                }
            }
        }
    }
}