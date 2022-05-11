using System;

namespace Domain
{
    public class ThreadParticipant
    {
        public Thread Thread { get; set; }
        public Guid ThreadId { get; set; }
        public AppUser User { get; set; }
        public string AppUserId { get; set; }
    }
}