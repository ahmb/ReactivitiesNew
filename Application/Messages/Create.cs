using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Messages
{
    public class Create
    {

        public class Command : IRequest<Result<MessageDto>>
        {
            //insert properties
            public string Body { get; set; }
            public Guid ThreadId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<MessageDto>>
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

            public async Task<Result<MessageDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                //add command handler logic

                // Activity activity = await _context.Activities.FindAsync(new object[] { request.ActivityId }, cancellationToken: cancellationToken);
                Domain.Thread thread = await _context.Threads.FindAsync(new object[] { request.ThreadId },
                      cancellationToken: cancellationToken);

                if (thread == null) return null;

                AppUser user = await _context.Users
                    .SingleOrDefaultAsync(appUsr => appUsr.UserName == _userAccessor.GetUsername(),
                         cancellationToken: cancellationToken);

                Message message = new()
                {
                    Author = user,
                    Body = request.Body,
                    CreatedAt = DateTime.UtcNow,
                    Thread = thread

                };

                thread.Messages.Add(message);


                bool success = await _context.SaveChangesAsync(cancellationToken) > 0;

                //if successfully added the comment to the database then:
                //return back the Comment DTO object which is generated from the comment object/paramter to Map
                if (success) return Result<MessageDto>.Success(_mapper.Map<MessageDto>(message));

                return Result<MessageDto>.Failure("Failed to add comment");
            }
        }
    }
}