using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameObserver.Models
{
    public class MatchConfigureModel
    {
        IEnumerable<ActorModel> HomePlayers { get; set; }
        IEnumerable<ActorModel> AwayPlayers { get; set; }
        FormationModel HomeFormation { get; set; }
        FormationModel AwayFormation { get; set; }
        
    }
}