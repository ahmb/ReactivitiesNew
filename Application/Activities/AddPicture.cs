using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities
{
    public class AddPicture
    {
        public class Command : IRequest<Result<Photo>>
        {
            //insert properties
            public IFormFile File { get; set; }
            public Guid ActivityId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                        .SingleOrDefaultAsync(a => a.Id == request.ActivityId
                            , cancellationToken: cancellationToken);

                if (activity == null) return null;

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId,
                    IsForActivity = true,
                };

                activity.Picture = photo;

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Result<Photo>.Success(photo);

                return Result<Photo>.Failure("Problem adding photo");

            }
        }
    }
}