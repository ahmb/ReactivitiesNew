using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Comments
{
    public class Create
    {
        //added a type infront of the IRequest because this command also returns something i.e. a commend
        public class Command : IRequest<CommentDto>
        {
            //insert properties
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
            public string Username { get; set; }
        }

        //added CommentDto as it is returned
        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                //add command handler logic

                Activity activity = await _context.Activities.FindAsync(new object[] { request.ActivityId }, cancellationToken: cancellationToken);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Not found" });
                }

                AppUser user = await _context.Users.SingleOrDefaultAsync(appUsr => appUsr.UserName == request.Username, cancellationToken: cancellationToken);

                Comment comment = new()
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                activity.Comments.Add(comment);

                bool success = await _context.SaveChangesAsync(cancellationToken) > 0;

                //if successfully added the comment to the database then:
                //return back the Comment DTO object which is generated from the comment object/paramter to Map
                if (success) return _mapper.Map<Comment, CommentDto>(comment);

                throw new Exception("Problem saving changes.");

            }
        }
    }
}