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
        public class Query : IRequest<Result<PagedList<ActivityDto>>>
        {
            public ActivityParams Params { get; set; }

        };

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
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
            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var query = _context.Activities
                    .Where(a => a.Date >= request.Params.StartDate)
                    .Where(a => !a.Private)
                    // .Where(a => a.Published) 
                    .Where(a => !a.IsSpam)
                    .Where(a => !a.IsCancelled)
                    .Where(a => !a.Archived)
                    .Where(a => a.Attendees.Count < a.AttendeeCountMax)
                    .OrderBy(a => a.Date)
                    .Include(a => a.Tag).ThenInclude(at => at.Tag)
                    .Include(a => a.Categories).ThenInclude(ac => ac.Categories)
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    // .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
                    //      new { currentUsername = _userAccessor.GetUsername() })
                    .AsQueryable();

                if (request.Params.IsGoing && !request.Params.IsHost)
                {
                    query = query.Where(x => x.Attendees.Any(aa => aa.AppUser.UserName == _userAccessor.GetUsername()));
                }

                if (request.Params.IsHost && !request.Params.IsGoing)
                {
                    query = query.Where(a => a.Attendees.FirstOrDefault(aa => aa.IsHost).AppUser.UserName == _userAccessor.GetUsername());

                }

                return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>
                        .CreateAsync(query.ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
                         new { currentUsername = _userAccessor.GetUsername() }),
                             request.Params.PageNumber,
                             request.Params.PageSize)
                );
            }
        }
    }
}