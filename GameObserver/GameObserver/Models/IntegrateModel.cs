﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameObserver.Models
{
    public class IntegrateModel
    {
        public int IdPlayer { get; set; }
        public int IdClub { get; set; }
        public DateTime Date { get; set; }
        public int IdPosition { get; set; }
    }
}