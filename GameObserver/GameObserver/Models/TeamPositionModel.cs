using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameObserver.Models
{

    public class TeamPositionModel
    {
        public IEnumerable<ActorModel> PlayerHome { get; set; }
        public IEnumerable<ActorModel> PlayerAway { get; set; }
    }
}