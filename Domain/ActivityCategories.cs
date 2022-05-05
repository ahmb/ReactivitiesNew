using System;
using System.Text.Json.Serialization;

namespace Domain
{
    public class ActivityCategories
    {
        [JsonIgnore]
        public Guid CategoriesId { get; set; }
        public Categories Categories { get; set; }

        [JsonIgnore]
        public Guid ActivityId { get; set; }
        [JsonIgnore]
        public Activity Activity { get; set; }


    }
}