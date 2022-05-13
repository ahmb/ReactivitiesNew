using System;

namespace Domain
{
    public class Message
    {
        //this id is int because its easier to sort that way?
        public Guid Id { get; set; }
        public string AuthorId { get; set; }
        public virtual AppUser Author { get; set; }

        public DateTime CreatedAt { get; set; }

        public string Body { get; set; }

        public MessageStatus MessageStatus { get; set; }
        public Thread Thread { get; set; }
        public Guid ThreadId { get; set; }

    }
}