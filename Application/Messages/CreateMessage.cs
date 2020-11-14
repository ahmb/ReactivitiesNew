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
    public class CreateMessage
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public Guid MessageId { get; set; }

            public DateTime SentDateTime { get; set; }


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

                var thread = await _context.Threads.SingleOrDefaultAsync(t => t.Id == request.Id);

                if (thread == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { thread = "Not found" });
                }

                AppUser user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var participant = await _context.ThreadParticipants.SingleOrDefaultAsync(tp => tp.TheadId == request.Id && tp.AppUserId == user.Id);


                if (participant == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { threadParticipant = "You are not an authorized recepient" });

                }

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



                bool success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");

            }

        }
    }
}