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

                // pendingAttendanceQuery = pendingAttendanceQuery.Where(a => a.Date.AddMinutes(-a.Duration).AddDays(-a.OngoingDays)
                //                                                          >= DateTime.UtcNow);

                pendingAttendanceQuery = pendingAttendanceQuery.OrderBy(a => a.Date);

                try
                {
                    var pendingAttendance = pendingAttendanceQuery
                        .ProjectTo<ActivityPendingDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                        .ToListAsync(cancellationToken: cancellationToken);

                    return Result<List<ActivityPendingDto>>.Success(await pendingAttendance);
                }
                catch
                {
                    return Result<List<ActivityPendingDto>>.Failure("Issue occured during Get - Unread Activity ");
                    throw;
                }

            }
        }
    }
}