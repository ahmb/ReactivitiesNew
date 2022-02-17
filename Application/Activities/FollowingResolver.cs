using System.Linq;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities
{
    public class FollowingResolver : IValueResolver<ActivityAttendee, ActivityAttendeeDto, bool>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;
        public FollowingResolver(IUserAccessor userAccessor, DataContext context)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public bool Resolve(ActivityAttendee source, ActivityAttendeeDto destination, bool destMember, ResolutionContext context)
        {
            AppUser currentUser = _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername()).Result;
            if (currentUser != null && currentUser.Followings.Any(x => x.TargetId == source.AppUserId))
            {
                return true;
            }

            return false;
        }
    }
}