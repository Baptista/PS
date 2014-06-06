using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameObserver.Models
{
    public class TeamDetailsModel
    {
        public TeamModel Team { get; set; }
        public IEnumerable<ActorModel> PlayersByTeam { get; set; }
        public IEnumerable<ActorModel> AllPlayers { get; set; }
        public ClubModel Club { get; set; }
        public FormationModel Formation { get; set; }

    }
}