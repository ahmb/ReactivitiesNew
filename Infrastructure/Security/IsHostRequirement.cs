using System;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {

    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _dbContext;
        public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _dbContext = context;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            //get user id, because our activityattendee tables PK is a composite key of userid +activity id
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            var activityId = Guid.Parse(_httpContextAccessor
                                .HttpContext?.Request
                                .RouteValues.SingleOrDefault(x => x.Key == "id")
                                .Value?.ToString());

            //using the notracking here so that entity framework does not keep it in memory and track it
            //since the originals scope for this object is only the method call i.e its transient
            var attendee = _dbContext.ActivityAttendees
                            .AsNoTracking()
                            .SingleOrDefaultAsync(x => x.AppUserId == userId && x.ActivityId == activityId)
                            .Result;

            if (attendee == null) return Task.CompletedTask;

            if (attendee.IsHost) context.Succeed(requirement);

            return Task.CompletedTask;

        }
    }
}