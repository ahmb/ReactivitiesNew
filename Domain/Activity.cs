using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
        public string Category { get; set; }


        public DateTime Date { get; set; }

        public DateTime EndDate { get; set; }

        public bool Private { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

        public Double Longitude { get; set; }
        public Double Latitude { get; set; }
        public string ImageUrl { get; set; }
        public int AttendeeCount { get; set; }

        public int AttendeeCountMax { get; set; }
        public bool Archived { get; set; } //for soft delete
        public bool Published { get; set; } //for approvals
        public bool IsSpam { get; set; } //for spam
        public bool IsCancelled { get; set; }

        public bool InPerson { get; set; }
        public Guid ChatPassword { get; set; }
        public DateTime LastUpdated { get; set; }

        public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();

        public ICollection<ActivityCategories> Categories { get; set; } = new List<ActivityCategories>();
        public ICollection<ActivityTag> Tag { get; set; } = new List<ActivityTag>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();


    }
}