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
    public interface IActivityDto
    {
        Guid Id { get; set; }
        string Title { get; set; }
        string Description { get; set; }
        string Category { get; set; }
        DateTime Date { get; set; }
        DateTime EndDate { get; set; }
        string ImageUrl { get; set; }
        string City { get; set; }
        string Venue { get; set; }
        string Tags { get; set; }
        string HostUsername { get; set; }
        bool IsCancelled { get; set; }
        bool InPerson { get; set; }
        bool Private { get; set; }
        int AttendeeCount { get; set; }
        int AttendeeCountMax { get; set; }
        ICollection<CategoriesDto> Categories { get; set; }
        ICollection<TagDto> Tag { get; set; }
    }

    public class ActivityPreviewDetailsDto : IActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public DateTime EndDate { get; set; }
        public string ImageUrl { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public string Tags { get; set; }
        public string HostUsername { get; set; }
        public bool IsCancelled { get; set; }
        public bool InPerson { get; set; }
        public bool Private { get; set; }
        public int AttendeeCount { get; set; }
        public int AttendeeCountMax { get; set; }

        //list of AppUsers attending an activity i.e. Attendees
        // [JsonPropertyName("attendees")]
        //comments which are returned with the comments
        public ICollection<CategoriesDto> Categories { get; set; }
        public ICollection<TagDto> Tag { get; set; }
    }
}