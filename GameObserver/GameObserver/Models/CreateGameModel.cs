
using System.Collections.Generic;

namespace GameObserver.Models
{
    public class CreateGameModel
    {
        public IEnumerable<TeamModel> AllTeams { get; set; }
        public IEnumerable<StadiumModel> AllStadiums { get; set; }
        public IEnumerable<ActorModel> AllReferees { get; set; } 
    }
}