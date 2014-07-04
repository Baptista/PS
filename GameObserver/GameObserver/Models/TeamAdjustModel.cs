using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameObserver.Models
{
    public class TeamAdjustModel
    {
        public TeamModel Team { get; set; }
        public IEnumerable<ActorModel> PlayersByTeam { get; set; }
        public ClubModel Club { get; set; }
        public FormationModel Formation { get; set; }
    }
}