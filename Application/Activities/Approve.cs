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

namespace Application.Activities
{
    public class Approve
    {
        public class Command : IRequest
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;


            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //add command handler logic

                Activity activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Could not find activity" });

                //check if username in the reqest is attending
                UserActivity attendance = await _context.UserActivities.SingleOrDefaultAsync(ua => ua.ActivityId == request.Id && ua.AppUser.UserName == request.Username);

                if (attendance == null)
                    throw new RestException(HttpStatusCode.BadRequest, new { Attendance = "Provided user is not attending this activity." });

                //approve the attendance
                if (attendance.Read == false || attendance.IsApproved == false)
                {

                    attendance.IsApproved = true;
                    attendance.Read = true;

                    var success = await _context.SaveChangesAsync() > 0;
                    if (success) return Unit.Value;

                }

                //FIXME:should this throw an exception if no DB changes are made?
                return Unit.Value;

                throw new Exception("Problem saving changes.");

            }
        }
    }
}