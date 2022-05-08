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

                var activity = await _context.Activities
                    .AsNoTracking()
                    .Include(a => a.Tag).ThenInclude(at => at.Tag)
                    .Include(a => a.Categories).ThenInclude(ac => ac.Categories)
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);

                var user = await _context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUsername(), cancellationToken: cancellationToken);

                var previewActivity = _mapper.Map<ActivityPreviewDetailsDto>(activity);

                if (user == null) return Result<IActivityDto>.Success(previewActivity);

                var hostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance == null
                    || attendance.ApprovalStatus == Domain.ApprovalStatus.Pending
                    || attendance.ApprovalStatus == Domain.ApprovalStatus.Rejected) return Result<IActivityDto>.Success(previewActivity);

                var fullDetailedActivity = _mapper.Map<ActivityDetailsDto>(activity);

                // if (activity == null)
                // {
                //     throw new RestException(HttpStatusCode.NotFound, new { activity = "Not found" });
                // }

                return Result<IActivityDto>.Success(fullDetailedActivity);
            }
        }

    }
}