using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities
{
    public class Reject
    {
        public class Command : IRequest<Result<Unit>>
        {
            //insert properties
            public Guid Id { get; set; }

            public string Username { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;


            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //add command handler logic

                Activity activity = await _context.Activities.FindAsync(new object[] { request.Id }, cancellationToken: cancellationToken);

                if (activity == null) return null;
                // throw new RestException(HttpStatusCode.NotFound, new { Activity = "Could not find activity" });

                //check if username in the reqest is attending
                ActivityAttendee attendance = await _context.ActivityAttendees
                    .SingleOrDefaultAsync(
                        aa => 
                        aa.ActivityId == request.Id && aa.AppUser.UserName == request.Username,
                        cancellationToken: cancellationToken);

                if (attendance == null) return null;
                // throw new RestException(HttpStatusCode.BadRequest, new { Attendance = "Provided user is not attending this activity." });

                //FIXME: the rejection feature needs to be built in below now that approval is completed
                bool changed = false;

                if (attendance.Read == false)
                {
                    attendance.Read = true;
                    changed = true;
                }


                if (attendance.IsApproved == true)
                {
                    attendance.IsApproved = false;
                    changed = true;
                }

                if (changed)
                {
                    var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (success) return Result<Unit>.Success(Unit.Value);
                }


                return Result<Unit>.Success(Unit.Value);

                throw new Exception("Problem saving changes.");

            }
        }
    }
}