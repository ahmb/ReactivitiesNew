using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using NpgsqlTypes;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }
        public string Category { get; set; }
        public string Tags { get; set; }


        public DateTime Date { get; set; }

        public DateTime EndDate { get; set; }

        public bool Private { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

        public Double Longitude { get; set; }
        public Double Latitude { get; set; }
        public string ImageUrl { get; set; }
        public string Assets { get; set; }

        public int AttendeeCountMax { get; set; }
        public bool Archived { get; set; } = false;//for soft delete 
        public bool Published { get; set; } = true;//for approvals
        public bool IsSpam { get; set; } = false;//for spam
        public bool IsCancelled { get; set; } = false;

        public bool InPerson { get; set; } = false;
        public Guid ChatPassword { get; set; } = Guid.NewGuid();
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
        // public NpgsqlTsVector SearchVector { get; set; }


        // public AppUser Host
        // {
        //     get; set;
        // }

        public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>();

        public ICollection<ActivityCategories> Categories { get; set; } = new List<ActivityCategories>();
        public ICollection<ActivityTag> Tag { get; set; } = new List<ActivityTag>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();


    }
}