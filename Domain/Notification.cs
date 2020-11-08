using System;

namespace Domain
{
    public class Notification
    {

        public Guid Id { get; set; }
 
        public string RecieverId { get; set; }

        //added virtual because itll be lazily loaded

        public virtual AppUser Reciever { get; set; }
        public Guid ActivityId { get; set; }

        //added virtual because itll be lazily loaded
        public virtual Activity Activity { get; set; }

        public string Message { get; set; }
        public bool IsRead { get; set; }

        public string Type { get; set; }
        public virtual AppUser Sender { get; set; }
        public string SenderId { get; set; }


    }
}