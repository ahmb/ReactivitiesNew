using System;

namespace Domain
{
    public class Message
    {
        public string SenderId { get; set; }
        public virtual AppUser Sender { get; set; }
        public string RecieverId { get; set; }
        public virtual AppUser Reciever { get; set; }

        public DateTime SentAt { get; set; }

        public Guid Id { get; set; }
        public string Body { get; set; }


    }
}