using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using System.Linq;
using System;
using Application.Errors;
using System.Net;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Core;

namespace Application.Activities
{
    public class Unread
    {
        public class Query : IRequest<Result<List<ActivityPendingDto>>> { };

        public class Handler : IRequestHandler<Query, Result<List<ActivityPendingDto>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor accessor, IMapper mapper)
            {
                this._context = context;
                this._userAccessor = accessor;
                this._mapper = mapper;
            }

            //handler that returns a list all the activities in the database context
            public async Task<Result<List<ActivityPendingDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = await _context.Users.SingleOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetUsername(), cancellationToken: cancellationToken);

                if (currentUser == null) return null;

                var pendingAttendanceQuery =
                 _context.Activities
                    .AsNoTracking()
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    .AsQueryable();
                // .ProjectTo<ActivityDetailsDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() });
                // .ToListAsync(cancellationToken: cancellationToken);

                pendingAttendanceQuery = pendingAttendanceQuery
                                        .Where(a => a.Attendees.FirstOrDefault(aa => aa.IsHost).AppUser.UserName == _userAccessor.GetUsername());

                pendingAttendanceQuery = pendingAttendanceQuery
                                           .Where(a => a.Attendees.Any(aa => aa.ApprovalStatus == ApprovalStatus.Pending));

                var pendingAttendance = pendingAttendanceQuery
                    .ProjectTo<ActivityPendingDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .ToListAsync(cancellationToken: cancellationToken);

                return Result<List<ActivityPendingDto>>.Success(await pendingAttendance);

                // var queryable = currentUser.Activities
                //     .AsQueryable();

                // //get activities where hes the host
                // var activitiesHosted = queryable.Where(aa => aa.IsHost && aa.Activity.Date > DateTime.Now);

                // var userActivityList = new List<UserActivitiesUnreadDto>();

                // foreach (var activtiyHosted in activitiesHosted)
                // {

                //     //activity attendees to approve for activities hosted
                //     var userActivityAttenddees = _context.ActivityAttendees
                //                                     .OrderBy(aa => aa.Activity.Date)
                //                                     .Where(aa => aa.ActivityId == activtiyHosted.ActivityId &&
                // //                                          !aa.IsHost && !aa.Read).ToList();

                //     foreach (var userActivityAttendee in userActivityAttenddees)
                //     {
                //         string requestorImage;
                //         if (userActivityAttendee.AppUser.Photos.FirstOrDefault(photo => photo.IsMain) == null)
                //         {
                //             requestorImage = String.Empty;
                //         }
                //         else
                //         {
                //             requestorImage = userActivityAttendee.AppUser.Photos.FirstOrDefault(photo => photo.IsMain).Url;
                //         }
                //         userActivityList.Add(new UserActivitiesUnreadDto
                //         {
                //             RequestorName = userActivityAttendee.AppUser.DisplayName,
                //             RequestorUserName = userActivityAttendee.AppUser.UserName,
                //             RequestDateTime = userActivityAttendee.DateJoined,
                //             ActivityId = userActivityAttendee.Activity.Id,
                //             ActivityName = userActivityAttendee.Activity.Title,
                //             ActivityDateTime = userActivityAttendee.Activity.Date,
                //             RequestorImage = requestorImage
                //         });
                //     }

                // }

                // return userActivityList;

            }
        }
    }
}