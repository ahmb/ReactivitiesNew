using System;
using System.Text.Json.Serialization;

namespace Domain
{
    public class ActivityTag
    {
        
        [JsonIgnore]
        public Guid TagId { get; set; }
        public Tag Tag { get; set; }

        [JsonIgnore]
        public Guid ActivityId { get; set; }
        [JsonIgnore]
        public Activity Activity { get; set; }

    }
}