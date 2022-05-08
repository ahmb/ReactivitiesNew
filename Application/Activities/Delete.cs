using System;
using System.Threading;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistance;
using Domain;
using Application.Core;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            //insert properties
            public Guid Id { get; set; }

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

                activity.Archived = true;
                activity.IsCancelled = true;

                bool success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!success) return Result<Unit>.Failure("An error occured while deleting this activity.");

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}