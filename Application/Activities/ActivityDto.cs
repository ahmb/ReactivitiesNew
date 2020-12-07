using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Comments;
using Domain;

namespace Application.Activities
{
    public class ActivityDto
    {

        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }

        public DateTime Date { get; set; }
        public DateTime EndDate { get; set; }

        public string ImageUrl { get; set; }

        public bool Private { get; set; }

        public string City { get; set; }
        public string Venue { get; set; }
        public double Latitude { get; set; }

        public double Longitude { get; set; }

        public string Tags { get; set; }





        //list of AppUsers attending an activity i.e. Attendees
        [JsonPropertyName("attendees")]
        public ICollection<AttendeeDto> UserActivities { get; set; }

        //comments which are returned with the comments
        public ICollection<CommentDto> Comments { get; set; }


    }
}