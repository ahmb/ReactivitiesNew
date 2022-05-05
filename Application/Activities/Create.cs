using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                AppUser user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername()
                        , cancellationToken: cancellationToken);


                // update the code to add a useractivity or attendee 
                var attendee = new ActivityAttendee
                {
                    AppUser = user,
                    Activity = request.Activity,
                    IsHost = true,
                    DateJoined = DateTime.Now.ToUniversalTime(),
                    IsApproved = true
                };

                //Add attendee to the Activity object in the reques
                request.Activity.Attendees.Add(attendee);

                _context.Activities.Add(request.Activity);

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                var res = new Result<Unit>();

                if (!result) return Result<Unit>.Failure("An error occured while creating the Activity.");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}