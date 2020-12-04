using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<User>> CurentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }


        [HttpPost("interests/add")]
        public async Task<ActionResult<User>> AddInterest(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("interests/remove")]
        public async Task<ActionResult<User>> RemoveInterest(Register.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}