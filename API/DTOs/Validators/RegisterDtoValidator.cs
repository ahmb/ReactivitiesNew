using FluentValidation;

namespace API.DTOs.Validators
{
    public class RegisterDtoValidator : AbstractValidator<RegisterDto>
    {
        public RegisterDtoValidator()
        {
            RuleFor(x => x.DisplayName).NotEmpty();
            RuleFor(x => x.Username).NotEmpty();
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(rd => rd.Password).NotEmpty()
                .MinimumLength(6).WithMessage("Password must be atleast 6 characters in length.")
                .Matches("[A-Z]").WithMessage("Password must contain atleast 1 uppercase character")
                .Matches("[a-z]").WithMessage("Password must contain atleast 1 lowercase character")
                .Matches("[0-9]").WithMessage("Password must contain atleast 1 numeric character")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain atleast 1 symbol ($,%,#,^,@,! etc) character");
        }

    }
}