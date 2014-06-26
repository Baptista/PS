using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameObserver.DomainModel.Entities
{
    public class Actor
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public DateTime? Born { get; set; }
        public decimal Height { get; set; }
        public String Photo { get; set; }
        public int Weight { get; set; }
        public int Referee { get; set; }
        public int Player { get; set; }
    }
}
