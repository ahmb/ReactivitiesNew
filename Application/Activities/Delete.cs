using System;
using System.Threading;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistance;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            //insert properties
            public Guid Id { get; set; }

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

                Domain.Activity activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not found" });

                _context.Remove(activity);

                bool success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");

            }
        }
    }
}