using System;

namespace Domain
{
    public class MsgReadState
    {

        public virtual Msg Message { get; set; }
        public Guid MessageId { get; set; }

        public string AppUserId { get; set; }

        //added virtual because itll be lazily loaded
        public virtual AppUser AppUser { get; set; }
        public DateTime ReadDateTime { get; set; }


    }
}