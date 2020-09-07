using System;

namespace Domain
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        //lazy loading hence virtual keyword
        public virtual AppUser Author { get; set; }
        //lazy loading hence virtual keyword
        public virtual Activity Activity { get; set; }
        public DateTime CreatedAt { get; set; }




    }
}