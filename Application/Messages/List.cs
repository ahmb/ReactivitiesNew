using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Messages
{
    public class List
    {
        public class Query : IRequest<Result<List<Message>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<Message>>>
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


            public async Task<Result<List<Message>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // var comments = await _context.Comments
                //     .Where(x => x.Activity.Id == request.ActivityId)
                //     .OrderByDescending(x => x.CreatedAt)
                //     .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                //     .ToListAsync(cancellationToken: cancellationToken);

                // return Result<List<Message>>.Success(comments);


                var user = await _context.Users.FirstOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetUsername(), cancellationToken: cancellationToken);

                // var messages = await user.MessagesRecieved

                throw new NotImplementedException();

            }
        }
    }
}