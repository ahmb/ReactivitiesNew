using System;
using System.Collections.Generic;

namespace Domain
{
    public class Tag
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<ActivityTag> Activities { get; set; } = new List<ActivityTag>();

    }
}