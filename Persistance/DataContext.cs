using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistance
{
    public class DataContext : IdentityDbContext<AppUser>//DbContext//IdentityDbContext<Domain.AppUser>
    {
        // public DataContext()
        // {

        // }
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Value> Values { get; set; }

        public DbSet<Activity> Activities { get; set; }

        public DbSet<UserActivity> UserActivities { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<UserFollowing> Followings { get; set; }



        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            _ = builder.Entity<Value>()
                .HasData(
                    new Value { Id = 1, Name = "Value 101" },
                    new Value { Id = 2, Name = "Value 102" },
                    new Value { Id = 3, Name = "Value 103" }
                );

            builder.Entity<Comment>()
                .HasOne(comment => comment.Activity)
                .WithMany(acivity => acivity.Comments)
                .HasForeignKey(comment => comment.ActivityId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Comment>()
                .HasOne(comment => comment.Author)
                .WithMany(appUser => appUser.Comments)
                .HasForeignKey(comment => comment.AppUserId)
                .OnDelete(DeleteBehavior.Cascade);


            //build joint table UserActivity table between User and Activity tables
            builder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.AppUserId, ua.ActivityId }));

            //model the first side of the one to many relationship after decomoposing the many-to-many relationship
            builder.Entity<UserActivity>()
            //AppUser is the principal entity here , and its lazy loaded, and has a collection object navigation property
                .HasOne(u => u.AppUser)
            //userActivities is the depdenent entity here, since the model has a single object navigation property
                .WithMany(a => a.UserActivities)
                .HasForeignKey(u => u.AppUserId)
                // specify the action which should take place on a dependent entity in a relationship when the principal is deleted.
                .OnDelete(DeleteBehavior.Cascade);

            //model the second side of the one to many relationship after decomoposing the many-to-many relationship
            builder.Entity<UserActivity>()
            //Activity is the principal entity here , and its lazy loaded, and has a collection object navigation property
                .HasOne(a => a.Activity)
            //userActivities is the depdenent entity here, since the model has a single object navigation property
                .WithMany(a => a.UserActivities)
                .HasForeignKey(u => u.ActivityId)
                // specify the action which should take place on a dependent entity in a relationship when the principal is deleted.
                .OnDelete(DeleteBehavior.Cascade);


            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(uF => new { uF.ObserverId, uF.TargetId });

                //define the first side of the on to many relationship between UserFollowing and AppUser 
                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.Restrict);

                //define the second side of the on to many relationship between UserFollowing and AppUser 
                b.HasOne(o => o.Target)
                    .WithMany(f => f.Followers)
                    .HasForeignKey(o => o.TargetId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
