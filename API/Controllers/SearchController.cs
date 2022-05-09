using Application.Activities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SearchController : BaseController
    {
        [HttpPost("{searchTerm}")]
        [AllowAnonymous]
        public async Task<ActionResult<Unit>> Search(string searchTerm)
        {
            return HandleResult(await Mediator.Send(new Search.Query { SearchTerm = searchTerm }));
        }

    }
}