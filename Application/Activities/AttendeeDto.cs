namespace Application.Activities
{
    public class AttendeeDto
    {
        public string Username { get; set; }

        public string DisplayName { get; set; } 
        public string Image { get; set; }

        public bool IsHost { get; set; }

        public bool Following { get; set; }

        public bool IsApproved { get; set; }

        public int Rating { get; set; }

        public bool Read { get; set; }

        
    }
}