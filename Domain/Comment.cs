using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Body { get; set; }

        public string AppUserId { get; set; }

        //lazy loading hence virtual keyword
        public virtual AppUser Author { get; set; }

        [MaxLength(255)]
        public Guid ActivityId { get; set; }

        //lazy loading hence virtual keyword
        public virtual Activity Activity { get; set; }
        public DateTime CreatedAt { get; set; }


    }
}