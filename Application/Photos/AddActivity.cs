using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistance;

namespace Application.Photos
{
    public class AddActivity
    {
        public class Command : IRequest<Result<Photo>>
        {
            //insert properties
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
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

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var user = await _context.Users
                        .Include(p => p.Photos)
                        .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername(), cancellationToken: cancellationToken);

                    if (user == null) return null;

                    var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                    var photo = new Photo
                    {
                        Url = photoUploadResult.Url,
                        Id = photoUploadResult.PublicId,
                        IsForActivity = true,
                        IsMain = false
                    };
                    return Result<Photo>.Success(photo);
                }
                catch (Exception e)
                {
                    _logger.LogError("Error Occured Adding Photo {a} and {b} for user: {c}",
                         e.Message.ToString(),
                         e.InnerException.ToString(),
                         _userAccessor.GetUsername() ?? "Unknown User");

                    return Result<Photo>.Failure("Problem adding photo");
                }
                // var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                // if (success) 

            }
        }
    }
}