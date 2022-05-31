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
    public class ActivityDto : IActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        // public DateTime EndDate { get; set; }
        public int Duration { get; set; }
        public bool Private { get; set; }
        public string ImageUrl { get; set; }
        public bool IsCancelled { get; set; }
        // public string City { get; set; }
        // public string Venue { get; set; }
        public string HostUsername { get; set; }
        public bool InPerson { get; set; }
        public bool Ongoing { get; set; }
        public int OngoingDays { get; set; } = 0;

        public AttendeeDto Host { get; set; }
        public bool IsGoing { get; set; } = false;

        public SkillLevel SkillLevel { get; set; }
        public Language Language { get; set; } = Language.English;


        public int AttendeeCount { get; set; }
        public int AttendeeCountMax { get; set; }
        public ApprovalStatus ApprovalStatus { get; set; } = ApprovalStatus.NotRequested;


        //list of AppUsers attending an activity i.e. Attendees
        // [JsonPropertyName("attendees")]
        //comments which are returned with the comments
        // public ICollection<CommentDto> Comments { get; set; }
        public ICollection<CategoriesDto> Categories { get; set; }
        public ICollection<TagDto> Tag { get; set; }
    }
}