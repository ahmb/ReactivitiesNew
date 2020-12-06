using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Profiles {
    public class Edit {
        public class Command : IRequest {
            //insert properties
            public string DisplayName { get; set; }
            public string Bio { get; set; }

            public List<string> Interests { get; set; }
        }

        public class CommandValidator: AbstractValidator<Command>{
            public CommandValidator(){
                RuleFor(x=>x.DisplayName).NotEmpty().MinimumLength(3);
                RuleFor(x => x.Interests).NotEmpty();

            }
        }

        public class Handler : IRequestHandler<Command> {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler (DataContext context, IUserAccessor userAccessor) {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle (Command request, CancellationToken cancellationToken) {
                //add command handler logic
                var user = await _context.Users.SingleOrDefaultAsync(x=>x.UserName == _userAccessor.GetCurrentUsername());
                user.DisplayName = request.DisplayName ?? user.DisplayName;
                user.Bio = request.Bio ?? user.Bio;

                user.Interests.Clear();

                var UserInterests = new List<Interest>();
                
                if (request.Interests.Count > 0)
                {
                    foreach (var interest in request.Interests)
                    {
                        UserInterests.Add(new Interest { Id = new Guid(), Name = interest });
                    }

                }

                user.Interests = UserInterests;


                var success = await _context.SaveChangesAsync () > 0;

                if (success) return Unit.Value;

                throw new Exception ("Problem saving changes.");

            }
        }
    }
}