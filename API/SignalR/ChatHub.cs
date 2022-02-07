using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using System;
using Application.Messages;

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
            string username = GetUsername();

            command.Username = username;

            //handle the comment create command, this will create the proper entry in the DBAdd
            CommentDto comment = await _mediator.Send(command);

            //send the comment to all the clients
            await Clients.Group(command.ActivityId.ToString()).SendAsync("RecieveComment", comment);
        }

        public async Task SendMessage(CreateMessage.Command command)
        {
            string username = GetUsername();

            command.Username = username;

            //handle the comment create command, this will create the proper entry in the DBAdd
            var message = await _mediator.Send(command);

            //send the comment to all the clients
            await Clients.Group(command.ThreadId.ToString()).SendAsync("RecieveMessage", message);
        }

        public async Task SendThread(CreateThread.Command command)
        {
            try
            {
                var thread = await _mediator.Send(command);
                await Clients.Group(command.Id.ToString()).SendAsync("RecieveThread", thread);
            }
            catch (Exception ex)
            {
                await Clients.Group(command.Id.ToString()).SendAsync("RecieveError", ex);

            }
        }

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