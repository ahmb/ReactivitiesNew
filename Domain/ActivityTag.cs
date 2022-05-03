using System;

namespace Domain
{
    public class ActivityTag
    {
        public Guid TagId { get; set; }
        public Tag Tag { get; set; }

        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }

    }
}