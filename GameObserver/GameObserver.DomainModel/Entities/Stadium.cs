using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameObserver.DomainModel.Entities
{
    public class Stadium
    {
        public int Id { get; set; }
        public String Morada { get; set; }
        public String Name { get; set; }
        public int Capacity { get; set; }
    }
}
