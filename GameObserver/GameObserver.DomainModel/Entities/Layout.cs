﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameObserver.DomainModel.Entities
{
    public class Layout
    {
        public DateTime Hourminute { get; set; }
        public String Svg { get; set; }
        public int IdStadium { get; set; }
        public DateTime DateMatch { get; set; }
        public DateTime DateVisitor { get; set; }
        public int IdVisitor { get; set; }
        public DateTime DateAgainst { get; set; }
        public int IdAgainst { get; set; }
        
    }
}
