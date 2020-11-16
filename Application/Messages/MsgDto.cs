using System;
using System.Collections.Generic;
using Domain;

namespace Application.Messages
{
    public class MsgDto
    {
        public Guid Id { get; set; }

        public string AppUserUserName { get; set; }

        public DateTime SentDateTime { get; set; }

        public string Body { get; set; }
        public string ThreadId { get; set; }


    }
}