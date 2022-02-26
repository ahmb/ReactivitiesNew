using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Followers
{
    public class Delete
    {
        public class Command : IRequest
        {
            //insert properties
            public string Username { get; set; }
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
                //add command handler logic
                var observer = await _context.Users.SingleOrDefaultAsync(appUsr => appUsr.UserName == _userAccessor.GetUsername(), cancellationToken: cancellationToken);

                var target = await _context.Users.SingleOrDefaultAsync(appUsr => appUsr.UserName == request.Username, cancellationToken: cancellationToken);

                if (target == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not found" });

                var following = await _context.Followings.SingleOrDefaultAsync(usrFlwing => usrFlwing.ObserverId == observer.Id && usrFlwing.TargetId == target.Id, cancellationToken: cancellationToken);

                if (following == null)
                    throw new RestException(HttpStatusCode.BadRequest, new { User = "You are not following this user" });

                if (following != null)
                {
                    _context.Followings.Remove(following);
                }
                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");

            }
        }
    }
}