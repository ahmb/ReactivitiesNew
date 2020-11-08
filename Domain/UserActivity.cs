using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    //join table between activities and appusers
    public class UserActivity
    {
        public string AppUserId { get; set; }

        //added virtual because itll be lazily loaded
        public virtual AppUser AppUser { get; set; }

        [MaxLength(255)]
        public Guid ActivityId { get; set; }

        //added virtual because itll be lazily loaded
        public virtual Activity Activity { get; set; }

        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }

        public bool IsApproved { get; set; }

        public int Rating { get; set; }

        public bool Read { get; set; }

    }
}