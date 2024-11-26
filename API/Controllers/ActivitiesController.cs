using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {

        //Get a list of activities
        [HttpGet]
        public async Task<ActionResult<List.ActivitiesEnvelope>> GetActivities(
            int? limit, int? offset, bool isGoing, bool isHost, string category, DateTime? startDate
            )
        {
            return HandleResult(await Mediator.Send(new List.Query(limit,
                offset, isGoing, isHost, startDate, category)));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }

        [HttpDelete("{id}/unattend")]
        public async Task<ActionResult<Unit>> Unattend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }

        [HttpPost("{id}/approve/{username}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Approve(Guid id, string username)
        {
            return await Mediator.Send(new Approve.Command { Id = id, Username = username });
        }

        [HttpDelete("{id}/reject/{username}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Reject(Guid id, string username)
        {
            return await Mediator.Send(new Reject.Command { Id = id, Username = username });
        }


        [HttpGet("unread")]
        [Authorize]
        public async Task<ActionResult<List<UserActivitiesUnreadDto>>> Unread()
        {
            return await Mediator.Send(new Unread.Query());
        }




    }
}