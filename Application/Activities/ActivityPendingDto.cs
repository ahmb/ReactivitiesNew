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
    public class ActivityPendingDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string HostUsername { get; set; }
        public int AttendeeCount { get; set; }
        public int AttendeeCountMax { get; set; }

        public DateTime Date { get; set; }
        //list of AppUsers attending an activity i.e. Attendees
        // [JsonPropertyName("attendees")]
        public ICollection<AttendeeDto> Attendees { get; set; }
        //comments which are returned with the comments
    }
}