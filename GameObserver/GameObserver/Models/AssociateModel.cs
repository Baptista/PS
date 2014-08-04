using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameObserver.Models
{
    public class AssociateModel
    {
        public int IdEvent { get; set; }
        public DateTime Date { get; set; }
        public String IdUser { get; set; }
    }
}