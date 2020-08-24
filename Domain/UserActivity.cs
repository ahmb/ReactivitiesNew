using System;

namespace Domain
{
    //join table between activities and appusers
    public class UserActivity
    {
        public string AppUserId { get; set; }

        //added virtual because itll be lazily loaded
        public virtual AppUser AppUser { get; set; }
        public Guid ActivityId { get; set; }

        //added virtual because itll be lazily loaded
        public virtual Activity Activity { get; set; }

        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }

    }
}