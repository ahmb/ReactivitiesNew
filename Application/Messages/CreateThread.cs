using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Messages
{
    public class CreateThread
    {

        public class Command : IRequest<Result<ThreadDto>>
        {
            //insert properties
            public string Body { get; set; }
            public List<string> Participants { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty().MinimumLength(1).MaximumLength(1024);
                RuleFor(x => x.Participants).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<ThreadDto>>
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

            public async Task<Result<ThreadDto>> Handle(Command request, CancellationToken cancellationToken)
            {

                //add command handler logic
                string currentUsername = _userAccessor.GetUsername();

                //find the author to add to the message
                var author = _context.Users.SingleOrDefault(u => u.UserName == currentUsername);

                if (author is null) return null;

                //add author to the list of participants if not there
                if (!request.Participants.Contains(currentUsername))
                {
                    request.Participants.Add(currentUsername);
                }

                //check if theres a thread existing with these participants 
                Domain.Thread thread = _context.Threads
                    .Include(t => t.Messages)
                    .Include(t => t.Participants).ThenInclude(p => p.User)
                    .AsQueryable()
                    .SingleOrDefault(t => t.Participants.All(p => request.Participants.Contains(p.User.UserName)));

                // if so then add the message to it and return that thread
                if (thread is not null)
                {
                    thread.Messages = new List<Message>
                    {
                        new Message
                        {
                            Author = author,
                            CreatedAt = DateTime.UtcNow,
                            Body = request.Body,
                            Thread = thread
                        }
                    };

                    bool result2 = await _context.SaveChangesAsync(cancellationToken) > 0;

                    if (!result2) return Result<ThreadDto>.Failure("An error occured while creating the Activity.");

                    return Result<ThreadDto>.Success(_mapper.Map<ThreadDto>(thread));
                    // return Result<ThreadDto>.Success(_mapper.Map<ThreadDto>(thread, opt => opt.Items["currentUsername"] = currentUsername));
                }

                //remove author from list of participants , reset it to what it was before
                if (request.Participants.Contains(currentUsername))
                {
                    request.Participants.Remove(currentUsername);
                }

                //if thread does not exist with these participants then create it 
                //check for max number of participants

                thread = new Domain.Thread
                {
                    Participants = new List<ThreadParticipant>(),
                    Messages = new List<Message>()
                };

                //add participants to the thread
                foreach (var participant in request.Participants)
                {
                    var appUser = _context.Users.SingleOrDefault(u => u.UserName == participant && u.UserName != author.UserName);
                    if (appUser is not null)
                    {
                        thread.Participants.Add(new ThreadParticipant
                        {
                            Thread = thread,
                            User = appUser
                        });
                    }
                    else
                    {
                        return Result<ThreadDto>.Failure("Unable to add participants to thread and create it");
                    }
                }

                //add the author to the participants list
                thread.Participants.Add(new ThreadParticipant
                {
                    Thread = thread,
                    User = author
                });

                thread.Messages.Add(new Message
                {
                    Author = author,
                    CreatedAt = DateTime.UtcNow,
                    Body = request.Body,
                    Thread = thread
                });

                _context.Threads.Add(thread);

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;


                if (!result) return Result<ThreadDto>.Failure("An error occured while creating the Activity.");

                return Result<ThreadDto>.Success(_mapper.Map<ThreadDto>(thread));

            }
        }
    }
}