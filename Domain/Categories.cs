using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Categories
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        [JsonIgnore]
        public ICollection<ActivityCategories> Activities { get; set; } = new List<ActivityCategories>();

    }
}