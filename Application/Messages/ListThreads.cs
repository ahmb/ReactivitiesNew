using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Messages
{
    public class ListThreads
    {
        public class Query : IRequest<Result<List<ThreadDto>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<ThreadDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;

            }

            public async Task<Result<List<ThreadDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // var comments = await _context.Comments
                //     .Where(x => x.Activity.Id == request.ActivityId)
                //     .OrderByDescending(x => x.CreatedAt)
                //     .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                //     .ToListAsync(cancellationToken: cancellationToken);

                // return Result<List<Message>>.Success(comments);

                // var userThreads = _context.ThreadParticipants
                //                             .AsNoTracking()
                //                             .AsQueryable()
                //                             .Where(tp => tp.User.UserName == _userAccessor.GetUsername())
                //                             .OrderByDescending(tp => tp.Thread.Messages.Last().CreatedAt);

                var userThreads = await _context.Threads
                                        .AsNoTracking()
                                        .Include(t => t.Messages)
                                        .Include(t => t.Participants)
                                        .AsQueryable()
                                        .Where(t =>
                                                t.Participants.Any(tp => tp.AppUserId == _userAccessor.GetUserId()))
                                        .ProjectTo<ThreadDto>(_mapper.ConfigurationProvider)
                                        // .ProjectTo<ThreadDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                                        .ToListAsync(cancellationToken: cancellationToken);
                // .OrderByDescending(tp => tp.Thread.Messages.Last().CreatedAt);


                return Result<List<ThreadDto>>.Success(userThreads);


                // var messages = await user.MessagesRecieved


            }
        }
    }
}