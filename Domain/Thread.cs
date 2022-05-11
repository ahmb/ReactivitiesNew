using System;
using System.Collections.Generic;

namespace Domain
{
    public class Thread
    {
        public Guid Id { get; set; }

        public ICollection<Message> Messages { get; set; }
        public ICollection<ThreadParticipant> Participants { get; set; }



    }
}