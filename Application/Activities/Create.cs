using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;

using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }

        }

        // public class CommandValidator : AbstractValidator<Command>
        // {
        //     public CommandValidator()
        //     {
        //         // RuleFor(x => x.Title).NotEmpty();
        //         // RuleFor(x => x.Description).NotEmpty();
        //         // RuleFor(x => x.Category).NotEmpty();
        //         // RuleFor(x => x.Date).NotEmpty();
        //         // RuleFor(x => x.EndDate).NotEmpty();
        //         // // RuleFor(x => x.Private).NotEmpty();

        //         //TODO:Perform a check to see if categroy is one of the categories allowed

        //         // RuleFor(x => x.Venue).NotEmpty();
        //         // RuleFor(x => x.City).NotEmpty();
        //         // RuleFor(x => x.Longitude).NotEmpty();
        //         // RuleFor(x => x.Latitude).NotEmpty();
        //     }
        // }

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

                _context.Activities.Add(request.Activity);

                AppUser user = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername()
                        , cancellationToken: cancellationToken);


                //update the code to add a useractivity or attendee 
                // var attendee = new UserActivity
                // {
                //     AppUser = user,
                //     Activity = request.Activity,
                //     IsHost = true,
                //     DateJoined = DateTime.Now.ToUniversalTime(),
                //     IsApproved = true
                // };

                // _context.UserActivities.Add(attendee);

                bool success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");

            }
        }
    }
}