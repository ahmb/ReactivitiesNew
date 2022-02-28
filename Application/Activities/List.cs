using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;
using AutoMapper.QueryableExtensions;

namespace Application.Activities
{
    public class List
    {
        public class ActivitiesEnvelope
        {
            public List<ActivityDto> Activities { get; set; }
            public int ActivityCount { get; set; }
        }

        public class Query : IRequest<Result<ActivitiesEnvelope>>
        {
            public Query(int? limit, int? offset, bool isGoing, bool isHost, DateTime? startDate, string category)
            {

                Limit = limit;
                Offset = offset;
                IsGoing = isGoing;
                IsHost = isHost;
                StartDate = startDate ?? DateTime.Now; //TODO:should this be updated to UTC? what about ither instances of DateTime.Now?
                Category = category;
            }
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool IsGoing { get; }
            public bool IsHost { get; }
            public DateTime? StartDate { get; }

            public string Category { get; }
        };

        public class Handler : IRequestHandler<Query, Result<ActivitiesEnvelope>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            //handler that returns a list all the activities in the database context
            public async Task<Result<ActivitiesEnvelope>> Handle(Query request, CancellationToken cancellationToken)
            {
                //NEW
                var activitiesss = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
                         new { currentUsername = _userAccessor.GetUsername() })
                    .ToListAsync(cancellationToken);

                // //OLD
                // var queryable = _context.Activities
                // .Where(x => x.Date >= request.StartDate)
                // .OrderBy(x => x.Date)
                // .AsQueryable();

                // if (request.IsGoing && !request.IsHost)
                // {
                //     queryable = queryable
                //         .Where(x => x.Attendees.Any(a => a.AppUser.UserName == _userAccessor.GetUsername()));
                // }

                // if (request.IsHost && !request.IsGoing)
                // {
                //     queryable = queryable
                //         .Where(x => x.Attendees.Any(a => a.AppUser.UserName == _userAccessor.GetUsername() && a.IsHost));
                // }

                // if (request.Category != null && request.Category.Length > 0)
                // {
                //     queryable = queryable.Where(x => x.Category.ToLower() == request.Category.ToLower());
                // }

                // var activities = await queryable
                //     .Skip(request.Offset ?? 0)
                //     .Take(request.Limit ?? 3)
                //     //eager loading
                //     // .Include(y => y.Attendees)
                //     // .ThenInclude(u => u.AppUser)
                //     .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                //     .ToListAsync(cancellationToken: cancellationToken);

                var ae = new ActivitiesEnvelope
                {
                    // Activities = _mapper.Map<List<ActivityDto>>(activities),
                    Activities = activitiesss,
                    ActivityCount = activitiesss.Count
                };

                return Result<ActivitiesEnvelope>.Success(ae);
            }
        }
    }
}