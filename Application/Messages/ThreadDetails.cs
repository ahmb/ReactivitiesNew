using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Persistance;

namespace Application.Messages
{
    public class ThreadDetails
    {
        public class Query : IRequest<ThreadDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ThreadDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ThreadDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var thread = await _context.Threads.FindAsync(request.Id);


                if (thread == null)
                    throw new RestException(HttpStatusCode.NotFound, new { thread = "Not found" });

                var threadToReturn = _mapper.Map<Domain.Thread, ThreadDto>(thread);

                return threadToReturn;

            }
        }
    }
}