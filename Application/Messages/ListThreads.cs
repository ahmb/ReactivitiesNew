using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Messages
{
    public class ListThreads
    {
        public class Query : IRequest<List<ThreadDto>> { };



        public class Handler : IRequestHandler<Query, List<ThreadDto>>
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
            public async Task<List<ThreadDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var threadss = _context.Threads
                    .Where(t => t.ThreadParticipants.Any(tp => tp.AppUser.UserName == _userAccessor.GetUsername()));
                // .IncludeFilter(t => t.Messages.Take(1) );


                // threadss.Load();
                // foreach (var thread in threadss)
                // {
                //     _context
                //     .Entry(thread)
                //     .Collection(t => t.Messages)
                //     .Query()
                //     .FirstOrDefault();
                // }


                // var list = ctx.Orders.IncludeFilter(x => x.Items.Where(y => !y.IsSoftDeleted)
                //                            .OrderBy(y => y.Date)
                //                            .Take(10))

                var threads = await threadss.ToListAsync(cancellationToken: cancellationToken);
                // var threads = await queryable.ToListAsync();
                // .Skip(request.Offset ?? 0)
                // .Take(request.Limit ?? 3).ToListAsync();

                if (threads.Count > 0)
                {
                    var threadToReturn = _mapper.Map<List<Domain.Thread>, List<ThreadDto>>(threads);

                    return threadToReturn;

                }

                return new List<ThreadDto>();

            }
        }
    }
}