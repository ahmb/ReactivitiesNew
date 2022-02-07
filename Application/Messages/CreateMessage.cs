using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Messages
{
    public class CreateMessage
    {
        public class Command : IRequest<MsgDto>
        {
            public Guid ThreadId { get; set; }
            public Guid MessageId { get; set; }
            public DateTime SentDateTime { get; set; }
            public string Body { get; set; }

            public string Username { get; set; }


        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ThreadId).NotEmpty();
                RuleFor(x => x.MessageId).NotEmpty();
                RuleFor(x => x.SentDateTime).NotEmpty();
                RuleFor(x => x.Body).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();

            }
        }

        public class Handler : IRequestHandler<Command, MsgDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            private readonly IMapper _mapper;


            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<MsgDto> Handle(Command request, CancellationToken cancellationToken)
            {

                var thread = await _context.Threads.SingleOrDefaultAsync(t => t.Id == request.ThreadId);

                if (thread == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { thread = "Not found" });
                }

                AppUser user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                var participant = await _context.ThreadParticipants.SingleOrDefaultAsync(tp => tp.TheadId == request.ThreadId && tp.AppUserId == user.Id);


                if (participant == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { threadParticipant = "You are not an authorized participant" });

                }

                var message = new Msg
                {
                    ThreadId = request.ThreadId,
                    Thread = thread,
                    Id = request.MessageId,
                    SentDateTime = request.SentDateTime,
                    Body = request.Body,
                    AppUser = user,
                    AppUserId = user.Id
                };

                _context.Msgs.Add(message);

                bool success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<Msg, MsgDto>(message);

                // if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");

            }

        }
    }
}