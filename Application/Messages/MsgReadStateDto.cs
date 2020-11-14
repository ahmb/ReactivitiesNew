using System;
using Domain;

namespace Application.Messages
{
    public class MsgReadStateDto
    {
        public Guid MessageId { get; set; }
        public DateTime ReadDateTime { get; set; }
    }
}