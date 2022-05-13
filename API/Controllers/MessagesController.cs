using System.Collections.Generic;
using Application.Messages;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController : BaseController
    {

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetInbox()
        {
            return HandleResult(await Mediator.Send(new ListThreads.Query()));
        }

        [HttpGet("{threadId}")]
        [Authorize]
        public async Task<IActionResult> GetMessages(Guid threadId)
        {
            return HandleResult(await Mediator.Send(new List.Query { ThreadId = threadId }));
        }

        [HttpPost("{threadId}")]
        [Authorize]
        public async Task<IActionResult> SendMessage(Guid threadId, [FromBody] string messageBody)
        {
            return HandleResult(await Mediator.Send(new Create.Command { ThreadId = threadId, Body = messageBody }));
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateThread(CreateThread.Command command)
        {
            return HandleResult(await Mediator.Send(new CreateThread.Command { Participants = command.Participants, Body = command.Body }));
        }

    }
}