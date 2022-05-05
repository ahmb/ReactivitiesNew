using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Categories.Count).GreaterThan(0).LessThan(4).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.InPerson).NotEmpty();
            RuleFor(x => x.Private).NotEmpty();
            RuleFor(x => x.AttendeeCountMax).NotEmpty().GreaterThan(1).LessThan(7);
            // RuleFor(x => x.EndDate).NotEmpty();
            // RuleFor(x => x.Private).NotEmpty();

            //TODO:Perform a check to see if categroy is one of the categories allowed

            // RuleFor(x => x.Venue).NotEmpty();
            // RuleFor(x => x.City).NotEmpty();
            // RuleFor(x => x.Longitude).NotEmpty();
            // RuleFor(x => x.Latitude).NotEmpty();
        }
    }
}