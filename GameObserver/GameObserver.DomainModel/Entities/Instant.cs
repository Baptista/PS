﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameObserver.DomainModel.Entities
{
    public class Instant
    {
        public DateTime MinuteSeconds { get; set; }
        public int IdStadium { get; set; }
        public DateTime DateMatch { get; set; }
        public DateTime DateVisitor { get; set; }
        public int IdVisitor { get; set; }
        public DateTime DateAgainst { get; set; }
        public int IdAgainst { get; set; }
        public String IdUser { get; set; }
        public int IdCause { get; set; }
        public int? IdExecute { get; set; }

        public int IdEvent{get;set;}

    }
}
