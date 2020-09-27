using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Activity
    {
        [MaxLength(255)]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }

        public DateTime Date { get; set; }

        public string City { get; set; }
        public string Venue { get; set; }

        public Double Longitude { get; set; }
        public Double Latitude { get; set; }


        //the virtual keyword is used here so it can be used with Proxies for lazy loading
        public virtual ICollection<UserActivity> UserActivities { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }


    }
}