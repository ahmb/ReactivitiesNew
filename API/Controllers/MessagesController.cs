using Application.Messages;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController : BaseController
    {

        [HttpGet("inbox")]
        [Authorize]
        public async Task<IActionResult> GetInbox()
        {
            return HandleResult(await Mediator.Send(new ListThreads.Query()));
        }

        [HttpGet("messages/{threadId}")]
        [Authorize]
        public async Task<IActionResult> GetMessages(Guid username)
        {
            throw new NotImplementedException();
        }

        [HttpPost("messages/{threadId}")]
        [Authorize]
        public async Task<IActionResult> SendMessage(Guid threadId)
        {
            throw new NotImplementedException();
        }

    }
}