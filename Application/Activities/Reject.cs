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
    public class Reject
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

                //FIXME: the rejection feature needs to be built in below now that approval is completed

                //do not approve attendance and just mark it as read to imply rejection
                if(attendance.Read == true || attendance.IsApproved == true){
                    attendance.IsApproved = false;
                    attendance.Read = true;


                    var success = await _context.SaveChangesAsync() > 0;

                    if (success) return Unit.Value;

                }


                return Unit.Value;

                throw new Exception("Problem saving changes.");

            }
        }
    }
}