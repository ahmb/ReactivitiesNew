using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Categories;
using Application.Comments;
using Application.Profiles;
using Application.Tags;
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
        public string HostUsername { get; set; }
        public bool IsCancelled { get; set; }
        //list of AppUsers attending an activity i.e. Attendees
        // [JsonPropertyName("attendees")]
        public ICollection<AttendeeDto> Attendees { get; set; }
        //comments which are returned with the comments
        public ICollection<CommentDto> Comments { get; set; }

        public ICollection<CategoriesDto> Categories { get; set; }
        public ICollection<TagDto> Tag { get; set; }
    }
}