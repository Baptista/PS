using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameObserver.DomainModel.Entities
{
    public class Contain
    {
        public int IdPlayer { get; set; }
        public int IdClub { get; set; }
        public DateTime Date { get; set; }
        public Boolean OnField { get; set; }
    }
}
