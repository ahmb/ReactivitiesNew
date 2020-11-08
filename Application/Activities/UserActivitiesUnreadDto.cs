using System;

namespace Application.Activities
{
    public class UserActivitiesUnreadDto
    {
    public string RequestorName { get; set; }
    public string RequestorUserName { get; set; }   

    public DateTime RequestDateTime { get; set; }
    public Guid ActivityId { get; set; }
    public string ActivityName { get; set; }

    public DateTime ActivityDateTime { get; set; }

    public string RequestorImage {get;set;} 


    }
}