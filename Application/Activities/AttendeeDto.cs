using Domain;

namespace Application.Activities
{
    public class AttendeeDto
    {
        public string Username { get; set; }

        public string DisplayName { get; set; }
        public string Image { get; set; }
        public string Bio { get; set; }

        public bool IsHost { get; set; }

        public bool Following { get; set; }

        public int FollowersCount { get; set; }

        public int FollowingCount { get; set; }


        public int Rating { get; set; }

        public bool Read { get; set; }

        public ApprovalStatus ApprovalStatus { get; set; }


    }
}