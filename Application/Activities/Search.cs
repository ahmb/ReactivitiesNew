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
using Npgsql.EntityFrameworkCore.PostgreSQL;
using System.Collections.Generic;
using Domain;
using System.Text;

namespace Application.Activities
{
    public class Search
    {
        public class Query : IRequest<Result<PagedList<ActivityDto>>>
        {
            public string SearchTerm { get; set; }

            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request,
            CancellationToken cancellationToken)
            {
                var query = _context.Activities
                    .AsNoTracking()
                    .OrderByDescending(a => a.Date)
                    .AsQueryable()
                    .Include(a => a.Categories).ThenInclude(ac => ac.Categories)
                    .Include(a => a.Tag).ThenInclude(at => at.Tag)
                    .Where
                    (a => EF.Functions.ToTsVector(
                        "english",
                       string.Join(' ', a.Title, a.Description, a.Tags, a.Category)
                        )
                    .Matches(request.SearchTerm))
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider);

                //TODO:Update these values, as they are currently hardcoded
                return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>
                        .CreateAsync(query, 1,
                             50)
                    );
            }
        }
    }
}