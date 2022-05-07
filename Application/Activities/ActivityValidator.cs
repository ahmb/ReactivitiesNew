using Domain;
using FluentValidation;

namespace Application.Activities
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            //Default validation set
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Categories.Count).GreaterThan(0).LessThan(4).NotEmpty();
            RuleFor(x => x.Categories.Count).LessThan(6);
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Private).NotEmpty();
            RuleFor(x => x.AttendeeCountMax).NotEmpty().GreaterThan(1).LessThan(7);

            //For in person meetups
            When(a => a.InPerson == true, () =>
            {
                RuleFor(a => a.City).NotEmpty();
                RuleFor(a => a.Venue).NotEmpty();
                RuleFor(a => a.Longitude).NotEmpty();
                RuleFor(a => a.Latitude).NotEmpty();
            });

            //For online meetups
            When(a => a.InPerson == false, () =>
            {
                RuleFor(a => a.City).Empty();
                RuleFor(a => a.Venue).Empty();
                RuleFor(a => a.Longitude).Empty();
                RuleFor(a => a.Latitude).Empty();
            });
        }
    }
}