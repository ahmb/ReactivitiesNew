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

namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<Result<List<CommentDto>>>
        {
            public Guid ActivityId { get; set; }

            public string UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
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

            public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {

                if (_userAccessor.GetUserId() != null)

                //             if (_userAccessor.GetUserId() != null && _context.Activities.SingleOrDefaultAsync(a => a.Attendees.Any(
                // at => at.AppUserId == _userAccessor.GetUserId()), cancellationToken: cancellationToken) != null)
                {

                    var comments = await _context.Comments
                        .AsNoTracking()
                        .Where(x => x.Activity.Id == request.ActivityId)
                        .Where(c => c.Activity.Attendees.Any(at => at.AppUserId == _userAccessor.GetUserId() &&
                        at.ApprovalStatus == Domain.ApprovalStatus.Accepted))
                        .OrderByDescending(x => x.CreatedAt)
                        .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                        .ToListAsync(cancellationToken: cancellationToken);

                    return Result<List<CommentDto>>.Success(comments);
                }

                return null;

            }
        }
    }
}