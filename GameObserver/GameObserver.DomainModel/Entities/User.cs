using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameObserver.DomainModel.Entities
{
    public class User
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public int IdRole { get; set; }
    }
}
