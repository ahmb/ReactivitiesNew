using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        //the client calls this method name by referring to its name
        public async Task SendComment(Create.Command command)
        {
            string username =
                Context.User?.Claims?.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;

            command.Username = username;

            //handle the comment create command, this will create the proper entry in the DBAdd
            CommentDto comment = await _mediator.Send(command);

            //send the comment to all the clients
            await Clients.All.SendAsync("RecieveComment", comment);
        }
    }
}