using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Comments
{
    public class Create
    {
        //added a type infront of the IRequest because this command also returns something i.e. a commend
        public class Command : IRequest<Result<CommentDto>>
        {
            //insert properties
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty().MinimumLength(1).MaximumLength(1024);
            }
        }

        //added CommentDto as it is returned
        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                //add command handler logic

                Activity activity = await _context.Activities.FindAsync(new object[] { request.ActivityId }, cancellationToken: cancellationToken);

                if (activity == null) return null;

                AppUser user = await _context.Users
                    .Include(p => p.Photos)
                    .SingleOrDefaultAsync(appUsr => appUsr.UserName == _userAccessor.GetUsername(),
                         cancellationToken: cancellationToken);

                // if (user == null) return null;

                Comment comment = new()
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body,
                    CreatedAt = DateTime.UtcNow,
                };

                activity.Comments.Add(comment);

                bool success = await _context.SaveChangesAsync(cancellationToken) > 0;

                //if successfully added the comment to the database then:
                //return back the Comment DTO object which is generated from the comment object/paramter to Map
                if (success) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));

                return Result<CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}