using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseController
    {
        [HttpGet("{username}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await Mediator
                .Send(new Edit.Command
                { DisplayName = command.DisplayName, Bio = command.Bio }));
        }

        [HttpGet("{username}/activities")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserActivities(string username,
        string predicate)
        {
            return HandleResult(await Mediator
                .Send(new ListActivities.Query
                { Username = username, Predicate = predicate }));
        }
    }
}