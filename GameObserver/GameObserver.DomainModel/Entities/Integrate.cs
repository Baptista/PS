using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameObserver.DomainModel.Entities
{
    public class Integrate
    {
        public int IdPlayer { get; set; }
        public int IdClub { get; set; }
        public DateTime Date { get; set; }
        public int IdPosition { get; set; }
    }
}
