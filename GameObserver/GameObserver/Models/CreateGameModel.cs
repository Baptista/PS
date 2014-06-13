using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameObserver.Models
{
    public class CreateGameModel
    {
        public IEnumerable<TeamModel> AllTeams { get; set; }
        public IEnumerable<StadiumModel> AllStadiums { get; set; }
        public IEnumerable<ActorModel> AllReferees { get; set; } 
    }
}