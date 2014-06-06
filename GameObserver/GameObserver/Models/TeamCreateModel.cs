using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameObserver.Models
{
    public class TeamCreateModel
    {
        public IEnumerable<ClubModel> AllClubs { get; set; }
        public IEnumerable<FormationModel> AllFormations { get; set; } 
    }
}