using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile> {

            public string Username { get; set; }
            
         };

        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            //handler that returns a list all the activities in the database context
            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x=>x.UserName == request.Username);

                return new Profile {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Image = user.Photos.FirstOrDefault(x=>x.IsMain)?.Url,
                    Photos = user.Photos,
                    Bio = user.Bio,
                };
            }
        }
    }
}