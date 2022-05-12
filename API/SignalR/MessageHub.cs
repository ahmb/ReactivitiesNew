using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Messages;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System;
using Microsoft.Extensions.Logging;

namespace API.SignalR
{
    [Authorize]
    public class MessageHub : Hub
    {
        private readonly IMediator _mediator;
        public MessageHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        //the client calls this method name by referring to its name
        public async Task SendMessage(Create.Command command)
        {
            //handle the comment create command, this will create the proper entry in the DBAdd
            var message = await _mediator.Send(command);

            //send the comment to all the clients
            await Clients.Group(command.ThreadId.ToString())
                    .SendAsync("ReceiveMessage", message.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var threadId = httpContext.Request.Query["threadId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, threadId);
            var result = await _mediator.Send(new List.Query { ThreadId = Guid.Parse(threadId) });
            //
            await Clients.Caller.SendAsync("LoadMessages", result.Value);
        }

        // public async Task SendMessage(CreateMessage.Command command)
        // {
        //     //handle the comment create command, this will create the proper entry in the DBAdd
        //     var message = await _mediator.Send(command);

        //     //send the comment to all the clients
        //     await Clients.Group(command.ThreadId.ToString()).SendAsync("RecieveMessage", message);
        // }

        // public async Task SendThread(CreateThread.Command command)
        // {
        //     try
        //     {
        //         var thread = await _mediator.Send(command);
        //         await Clients.Group(command.Id.ToString()).SendAsync("RecieveThread", thread);
        //     }
        //     catch (Exception ex)
        //     {
        //         await Clients.Group(command.Id.ToString()).SendAsync("RecieveError", ex);

        //     }
        // }

        private string GetUsername()
        {
            return Context.User?.Claims?.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;
        }
        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            var username = GetUsername().ToString();
            if (ConnectedUser.Ids.ContainsKey(groupName))
            {
                //check to see if the user already exists in the hashset of groupname:[users]
                if (!ConnectedUser.Ids[groupName].Contains(username))
                {
                    ConnectedUser.Ids[groupName].Add(username);

                }
                // ConnectedUser.Ids[groupName].Add(GetUsername().ToString());  
            }
            else
            {
                var userArray = new List<string>
                {
                    GetUsername().ToString()
                };
                ConnectedUser.Ids.Add(groupName, new HashSet<string>(userArray));
            }
            // await Clients.Group(groupName).SendAsync("Send", $"{username} >> is online");
            foreach (var value in ConnectedUser.Ids[groupName])
            {
                await Clients.Group(groupName).SendAsync("Send", $"{value} >> is online");
            }
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            var username = GetUsername();
            ConnectedUser.Ids[groupName].Remove(username);
            await Clients.Group(groupName).SendAsync("Send", $"{username} >> went offline");
        }
    }
}