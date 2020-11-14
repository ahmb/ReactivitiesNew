using System;

namespace Domain
{
    public class ThreadParticipant
    {
        public virtual AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
        public virtual Thread Thread { get; set; }
        public Guid TheadId { get; set; }

    }
}