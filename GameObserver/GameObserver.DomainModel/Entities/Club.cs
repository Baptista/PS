using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameObserver.DomainModel.Entities
{
    public class Club
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public DateTime Established { get; set; }
        public String Symbol { get; set; }
    }
}
