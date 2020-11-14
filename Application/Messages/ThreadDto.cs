using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Application.Messages
{
    public class ThreadDto
    {
        public Guid Id { get; set; }

        [JsonPropertyName("participants")]
        public ICollection<ThreadParticipantDto> ThreadParticipants { get; set; }
        
        [JsonPropertyName("messages")]
        public ICollection<MsgDto> Messages { get; set; }
    }
}