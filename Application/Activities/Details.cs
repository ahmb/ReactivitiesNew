using System;
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

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<IActivityDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IActivityDto>>
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

            public async Task<Result<IActivityDto>> Handle(Query request,
            CancellationToken cancellationToken)
            {

                var activity = _context.Activities
                    .AsNoTracking()
                    .AsQueryable()
                    .Include(a => a.Tag).ThenInclude(at => at.Tag)
                    .Include(a => a.Categories).ThenInclude(ac => ac.Categories)
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    .Where(x => x.Id == request.Id);

                var user = await _context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUsername(), cancellationToken: cancellationToken);


                if (user == null)
                {
                    var previewActivity = await activity.ProjectTo<ActivityDto>
                        (_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                        .FirstAsync(cancellationToken: cancellationToken);

                    return Result<IActivityDto>.Success(previewActivity
                    );

                }

                var detailedActivity = await activity.ProjectTo<ActivityDetailsDto>
                        (_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                        .FirstAsync(cancellationToken: cancellationToken);


                var hostUsername = detailedActivity.Attendees.FirstOrDefault(x => x.IsHost)?.Username;

                var attendance = detailedActivity.Attendees.FirstOrDefault(x => x.Username == user.UserName);

                if (attendance == null
                    || attendance.ApprovalStatus == Domain.ApprovalStatus.Pending
                    || attendance.ApprovalStatus == Domain.ApprovalStatus.Rejected)
                {
                    return Result<IActivityDto>.Success(_mapper.Map<ActivityDetailsDto, ActivityDto>(detailedActivity));
                }

                // if (activity == null)
                // {
                //     throw new RestException(HttpStatusCode.NotFound, new { activity = "Not found" });
                // }

                return Result<IActivityDto>.Success(detailedActivity);
            }
        }

    }
}