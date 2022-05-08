using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    //join table between activities and appusers
    public class ActivityAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
        public bool IsApproved { get; set; }
        public int Rating { get; set; }
        public bool Read { get; set; }
        public ApprovalStatus ApprovalStatus { get; set; } = ApprovalStatus.Pending;

    }
}