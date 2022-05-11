using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController : BaseController
    {
        //         [HttpGet]
        // [AllowAnonymous]
        // public async Task<IActionResult> GetActivities([FromQuery] ActivityParams param)
        // {
        //     return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        // }

        [HttpGet("inbox")]
        [Authorize]
        public async Task<IActionResult> GetInbox()
        {
            throw new NotImplementedException();
        }

        [HttpGet("messages/{username}")]
        [Authorize]
        public async Task<IActionResult> GetMessages(string username)
        {
            throw new NotImplementedException();
        }

        [HttpPost("messages/{username}")]
        [Authorize]
        public async Task<IActionResult> SendMessage(string username)
        {
            throw new NotImplementedException();
        }

    }
}