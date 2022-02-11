using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseController
    {
        [HttpGet("not-found")]
        [AllowAnonymous]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet("bad-request")]
        [AllowAnonymous]
        public ActionResult GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }

        [HttpGet("server-error")]
        [AllowAnonymous]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }
    }
}