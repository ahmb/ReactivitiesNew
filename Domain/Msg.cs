using System;
using System.Collections.Generic;

namespace Domain
{
    public class Msg
    {
        public Guid Id { get; set; }
        public virtual Thread Thread { get; set; }
        public Guid ThreadId { get; set; }

        public string AppUserId { get; set; }

        //added virtual because itll be lazily loaded
        public virtual AppUser AppUser { get; set; }

        public DateTime SentDateTime { get; set; }

        public string Body { get; set; }

        public virtual ICollection<MsgReadState> MsgReadStates { get; set; }



    }
}