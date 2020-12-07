using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
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
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }

            public DateTime Date { get; set; }
            public DateTime EndDate { get; set; }

            public bool Private { get; set; }

            public string City { get; set; }
            public string Venue { get; set; }
            public string Tags { get; set; }

            public double Latitude { get; set; }

            public double Longitude { get; set; }

        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.EndDate).NotEmpty();
                // RuleFor(x => x.Private).NotEmpty();

                //TODO:Perform a check to see if categroy is one of the categories allowed

                // RuleFor(x => x.Venue).NotEmpty();
                // RuleFor(x => x.City).NotEmpty();
                // RuleFor(x => x.Longitude).NotEmpty();
                // RuleFor(x => x.Latitude).NotEmpty();
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
                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    EndDate = request.EndDate,
                    Private = request.Private,
                    City = request.City,
                    Venue = request.Venue,
                    Longitude = request.Longitude,
                    Latitude = request.Latitude,
                    Tags = request.Tags,


                };
                _context.Activities.Add(activity);

                AppUser user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                UserActivity attendee = new UserActivity
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = true,
                    DateJoined = DateTime.Now.ToUniversalTime(),
                    IsApproved = true
                };

                _context.UserActivities.Add(attendee);

                bool success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");

            }
        }
    }
}