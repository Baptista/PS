using System;

namespace GameObserver.Models
{
    public class TimeLineModel
    {
        public int eventId { get; set; }
        public int causeId { get; set; }
        public int? executeId { get; set; }

        public DateTime date { get; set; }
    }
}