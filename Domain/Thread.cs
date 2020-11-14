using System;
using System.Collections.Generic;

namespace Domain
{
    public class Thread
    {
        public Guid Id { get; set; }

        public virtual ICollection<ThreadParticipant> ThreadParticipants { get; set; }
        public virtual ICollection<Msg> Messages { get; set; }

    }
}