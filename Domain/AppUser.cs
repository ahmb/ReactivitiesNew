using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        public string Bio { get; set; }
        public double Rating { get; set; } = 0;
        public DateTime DateJoined { get; set; } = DateTime.UtcNow;


        public ICollection<ActivityAttendee> Activities { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }


        public ICollection<Photo> Photos { get; set; }

        public ICollection<UserFollowing> Followings { get; set; }

        public ICollection<UserFollowing> Followers { get; set; }
        public ICollection<Interest> Interests { get; set; }
        public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    }
}