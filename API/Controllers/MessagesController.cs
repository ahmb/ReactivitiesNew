using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Application.Messages;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController : BaseController
    {

        //Get a list of activities
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<ThreadDto>>> ListThread()
        {
            return await Mediator.Send(new Application.Messages.ListThreads.Query());
        }


        [HttpGet("thread/{id}")]
        [Authorize]
        public async Task<ActionResult<ThreadDto>> Details(Guid id)
        {
            return await Mediator.Send(new ThreadDetails.Query { Id = id });
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Unit>> Create(CreateThread.Command command)
        {
            return await Mediator.Send(command);
        }


        [HttpPost("add/{threadId}")]
        [Authorize]
        public async Task<ActionResult<MsgDto>> Add(Guid threadId,CreateMessage.Command command)
        {
            command.ThreadId = threadId;
            return await Mediator.Send(command);
        }


    }
}