using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistance;
using System.Net;
using Domain;
using AutoMapper;
using Application.Core;

namespace Application.Activities
{
    public class Edit
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
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //add command handler logic
                var activity = await _context.Activities
                    .FindAsync(
                        new object[] { request.Activity.Id },
                        cancellationToken: cancellationToken
                        );

                if (activity == null)
                    return null;

                _mapper.Map(request.Activity, activity);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!success) return Result<Unit>.Failure("An error occured while trying to save the edited activity.");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}