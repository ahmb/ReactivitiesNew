using System.Linq;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }


        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<ActivityCategories> ActivityCategories { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ActivityTag> ActivityTags { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Activity>()
                // .HasGeneratedTsVectorColumn(
                //     a => a.SearchVector,
                //     "english",
                //     a => new { a.Title, a.Description })
                .HasIndex(a => new { a.Title, a.Description, a.Tags, a.Category })
                .HasMethod("GIN")
                .IsTsVectorExpressionIndex("english");

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Activities)
                .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.Activity)
                .WithMany(a => a.Attendees)
                .HasForeignKey(aa => aa.ActivityId);

            builder.Entity<Comment>()
                .HasOne(a => a.Activity)
                .WithMany(c => c.Comments)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });

                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(o => o.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(o => o.TargetId)
                    .OnDelete(DeleteBehavior.Cascade);

            });

            builder.Entity<ActivityCategories>(x => x.HasKey(ac => new { ac.CategoriesId, ac.ActivityId }));

            builder.Entity<ActivityCategories>()
                .HasOne(u => u.Categories)
                .WithMany(a => a.Activities)
                .HasForeignKey(ac => ac.CategoriesId);

            builder.Entity<ActivityCategories>()
                .HasOne(u => u.Activity)
                .WithMany(a => a.Categories)
                .HasForeignKey(ac => ac.ActivityId);


            builder.Entity<ActivityTag>(x => x.HasKey(at => new { at.TagId, at.ActivityId }));

            builder.Entity<ActivityTag>()
                .HasOne(u => u.Tag)
                .WithMany(a => a.Activities)
                .HasForeignKey(at => at.TagId);

            builder.Entity<ActivityTag>()
                .HasOne(u => u.Activity)
                .WithMany(a => a.Tag)
                .HasForeignKey(at => at.ActivityId);


        }
    }
}