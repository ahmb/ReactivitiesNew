using System.Collections.Generic;
using System.Text;

namespace Domain.Utilities
{

    public class Utils
    {
        public static string FlattenCategories(IEnumerable<ActivityCategories> categories)
        {
            var flattenedString = new StringBuilder();
            foreach (var category in categories)
            {
                flattenedString.Append(category.Categories.Name);
                flattenedString.Append(' ');
            }
            return flattenedString.ToString();
        }

        public static string FlattenTags(IEnumerable<ActivityTag> tags)
        {
            var flattenedString = new StringBuilder();
            foreach (var tag in tags)
            {
                flattenedString.Append(tag.Tag.Name);
                flattenedString.Append(' ');
            }
            return flattenedString.ToString();
        }
    }
}