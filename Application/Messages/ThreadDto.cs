using System;
using System.Collections.Generic;
using Domain;

namespace Application.Messages
{
    public class ThreadDto
    {
        public Guid Id { get; set; }

        public MessageDto LatestMessage { get; set; }
        public ICollection<ThreadParticipantDto> Contacts { get; set; }
    }
}