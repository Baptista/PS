using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameObserver.Mappers
{
    public class TimeLineModel
    {
        public int eventId { get; set; }
        public int causeId { get; set; }
        public int executeId { get; set; }

        public DateTime date { get; set; }
    }
}