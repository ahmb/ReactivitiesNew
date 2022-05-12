using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Messages
{
    public class List
    {
        public class Query : IRequest<Result<List<MessageDto>>>
        {
            public Guid ThreadId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<MessageDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<MessageDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var messages = await _context.Messages
                    .Where(m => m.ThreadId == request.ThreadId)
                    .OrderByDescending(x => x.CreatedAt)
                    .ProjectTo<MessageDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken: cancellationToken);

                return Result<List<MessageDto>>.Success(messages);

            }
        }
    }
}