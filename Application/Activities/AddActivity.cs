using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
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
    public class AddActivity
    {
        public class Command : IRequest<Result<Unit>>
        {
            //insert properties
            [FromForm(Name = "File")]
            public IFormFile File { get; set; }
            [FromForm(Name = "Activity")]
            public string Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly ILogger<AddActivity> _logger;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor, ILogger<AddActivity> logger)
            {
                _logger = logger;
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                if (!(request.Activity.Length > 0)) return null;

                Photo photo = null;

                _logger.LogInformation("Executing AddActivity for:");
                _logger.LogInformation("{a}", request.Activity);

                try
                {
                    var newActivityDto = JsonConvert.DeserializeObject<ActivityDetailsDto>(request.Activity);

                    if (newActivityDto.AttendeeCountMax > 5) return Result<Unit>.Failure("Error : Attendee Count Max exceeded 5");

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
                    }

                    var newActivity = new Activity
                    {
                        Id = newActivityDto.Id,
                        Title = newActivityDto.Title,
                        Description = newActivityDto.Description,
                        Date = newActivityDto.Date,
                        Duration = newActivityDto.Duration,
                        Private = newActivityDto.Private,
                        Ongoing = newActivityDto.Ongoing,
                        OngoingDays = newActivityDto.OngoingDays,
                        ImageUrl = photo?.Url,
                        Picture = photo ?? null,
                        Assets = newActivityDto.Assets,
                        AttendeeCountMax = newActivityDto.AttendeeCountMax,
                        Archived = false,
                        Published = true,
                        IsCancelled = false,
                        IsSpam = false,
                        Language = newActivityDto.Language,
                        SkillLevel = newActivityDto.SkillLevel,
                        InPerson = false
                    };

                    foreach (var category in newActivityDto.Categories)
                    {
                        newActivity.Categories.Add(
                            new ActivityCategories
                            {
                                Categories = await _context.Categories.SingleOrDefaultAsync(c => c.Name == category.Name, cancellationToken: cancellationToken),
                                Activity = newActivity
                            }
                            // _context.Categories.Where(c => c.Name == category.Name)
                            );
                    }

                    foreach (var tag in newActivityDto.Tag)
                    {
                        newActivity.Tag.Add(
                            new ActivityTag
                            {
                                Tag = new Tag { Name = tag.Name },
                                Activity = newActivity
                            }
                        );
                    }


                    // update the code to add a useractivity or attendee 
                    var attendee = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = newActivity,
                        IsHost = true,
                        DateJoined = DateTime.Now.ToUniversalTime(),
                        IsApproved = true,
                        ApprovalStatus = ApprovalStatus.Accepted
                    };

                    newActivity.Attendees.Add(attendee);

                    _context.Activities.Add(newActivity);
                    // if (photo != null)
                    // {
                    //     newActivity.ImageUrl = photo.Url;
                    //     newActivity.Picture = photo;
                    // }

                    bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                    _logger.LogInformation("Successfully executed AddActivity");

                    var res = new Result<Unit>();

                    if (!result) return Result<Unit>.Failure("An error occured while creating the Activity.");

                    return Result<Unit>.Success(Unit.Value);


                }
                catch (Exception e)
                {
                    _logger.LogError("Error Occured Adding Photo {a} and {b} for user: {c}",
                         e.Message.ToString(),
                         e.InnerException.ToString(),
                         _userAccessor.GetUsername() ?? "Unknown User");

                    return Result<Unit>.Failure("An error occured while creating the Activity.");
                }
                // var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                // if (success) 

            }
        }
    }
}