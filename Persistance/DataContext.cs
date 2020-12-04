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

        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Message> Messages { get; set; }

        public DbSet<Msg> Msgs { get; set; }
        public DbSet<MsgReadState> MsgReadStates { get; set; }
        public DbSet<Thread> Threads { get; set; }
        public DbSet<ThreadParticipant> ThreadParticipants { get; set; }

        public DbSet<Interest> Interests { get; set; }


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


            builder.Entity<Notification>()
                .HasOne(notification => notification.Reciever)
                .WithMany(appUser => appUser.Notifications)
                .HasForeignKey(notification => notification.RecieverId)
                .OnDelete(DeleteBehavior.Restrict);


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

            builder.Entity<Message>(b =>
            {
                b.HasKey(m => new { m.RecieverId, m.SenderId });

                //define the first side of the on to many relationship between Message and AppUser 
                b.HasOne(m => m.Sender)
                    .WithMany(u => u.MessagesSent)
                    .HasForeignKey(m => m.SenderId)
                    .OnDelete(DeleteBehavior.Restrict);

                //define the second side of the on to many relationshif between Message and AppUser 
                b.HasOne(m => m.Reciever)
                    .WithMany(u => u.MessagesRecieved)
                    .HasForeignKey(m => m.RecieverId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            builder.Entity<ThreadParticipant>(b =>
            {
                b.HasKey(t => new { t.AppUserId, t.TheadId });

                //define the first side of the on to many relationship between Message and AppUser 
                b.HasOne(t => t.Thread)
                    .WithMany(thread => thread.ThreadParticipants)
                    .HasForeignKey(t => t.TheadId)
                    .OnDelete(DeleteBehavior.Restrict);

                //define the second side of the on to many relationship between Message and AppUser 
                b.HasOne(t => t.AppUser)
                    .WithMany(u => u.ThreadPartipants)
                    .HasForeignKey(t => t.AppUserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            builder.Entity<Msg>(b =>
            {
                b.HasKey(m => m.Id);

                //define the first side of the on to many relationship between Message and AppUser 
                b.HasOne(m => m.Thread)
                    .WithMany(thread => thread.Messages)
                    .HasForeignKey(m => m.ThreadId)
                    .OnDelete(DeleteBehavior.Restrict);

                //define the second side of the on to many relationship between Message and AppUser 
                b.HasOne(m => m.AppUser)
                    .WithMany(a => a.Messages)
                    .HasForeignKey(m => m.AppUserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            builder.Entity<MsgReadState>(b =>
            {
                b.HasKey(m => new { m.MessageId, m.AppUserId});

                //define the first side of the on to many relationship between Message and AppUser 
                b.HasOne(m => m.Message)
                    .WithMany(m => m.MsgReadStates)
                    .HasForeignKey(m => m.MessageId)
                    .OnDelete(DeleteBehavior.Restrict);

                //define the second side of the on to many relationship between Message and AppUser 
                b.HasOne(m => m.AppUser)
                    .WithMany(a => a.MsgReadStates)
                    .HasForeignKey(m => m.AppUserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });


        }
    }
}
