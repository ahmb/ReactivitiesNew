using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var select = _context.ActivityAttendees
                    .Where(u => u.AppUser.UserName == request.Username
                    && u.ApprovalStatus == Domain.ApprovalStatus.Accepted);

                if (request.Predicate == "published" || _userAccessor.GetUsername() != request.Username)
                // if (_userAccessor.GetUsername() != request.Username || request.Predicate == "published")
                {
                    select = select.Where(attendee => attendee.Activity.PublishedToProfile == true);
                }

                // select = select.Where(attendee => !attendee.Activity.Private);

                var query = select.ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                                .AsQueryable();

                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= DateTime.UtcNow).OrderByDescending(a => a.Date),
                    "hosting" => query.Where(a => a.HostUsername == request.Username),
                    "future" => query.Where(a => a.Date > DateTime.UtcNow).OrderBy(a => a.Date),
                    "published" => query.OrderByDescending(a => a.Date),
                    _ => query.Where(a => a.Date > DateTime.UtcNow).OrderBy(a => a.Date)
                };

                var activities = await query.ToListAsync(cancellationToken: cancellationToken);

                return Result<List<UserActivityDto>>.Success(activities);
            }
        }
    }
}