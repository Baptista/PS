using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameObserver.Models
{
    public class ClubModel
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public DateTime Established { get; set; }
        public String Symbol { get; set; }
    }
}