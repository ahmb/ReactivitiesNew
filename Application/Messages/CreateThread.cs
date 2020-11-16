using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Messages
{
    public class CreateThread
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public Guid MessageId { get; set; }

            public DateTime SentDateTime { get; set; }
            public string To { get; set; }


            public string Body { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.MessageId).NotEmpty();
                RuleFor(x => x.SentDateTime).NotEmpty();
                RuleFor(x => x.Body).NotEmpty();
                RuleFor(x => x.To).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                AppUser user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

               if(user == null){
                    throw new RestException(HttpStatusCode.NotFound, new { user = "Could not senders Id in the system" });
                }

                AppUser sendToUser = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.To);


                if(sendToUser == null){
                    throw new RestException(HttpStatusCode.NotFound, new { user = "Could not locate recipient user" });
                }


                var thread = new Domain.Thread
                {
                    Id = request.Id,
                };

                _context.Threads.Add(thread);


                var message = new Msg
                {
                    ThreadId = request.Id,
                    Thread = thread,
                    Id = request.MessageId,
                    SentDateTime = request.SentDateTime,
                    Body = request.Body,
                    AppUser = user,
                    AppUserId = user.Id
                };

                _context.Msgs.Add(message);


                var threadParticipant = new ThreadParticipant
                {
                    TheadId = request.Id,
                    Thread = thread,
                    AppUserId = user.Id,
                    AppUser = user,
                };


                var threadParticipantTo = new ThreadParticipant
                {
                    TheadId = request.Id,
                    Thread = thread,
                    AppUserId = sendToUser.Id,
                    AppUser = sendToUser,
                };

                _context.ThreadParticipants.Add(threadParticipant);

                _context.ThreadParticipants.Add(threadParticipantTo);

                bool success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");

            }
        }
    }
}