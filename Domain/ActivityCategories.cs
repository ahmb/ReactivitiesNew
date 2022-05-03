using System;

namespace Domain
{
    public class ActivityCategories
    {
        public Guid CategoriesId { get; set; }
        public Categories Categories { get; set; }

        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }


    }
}