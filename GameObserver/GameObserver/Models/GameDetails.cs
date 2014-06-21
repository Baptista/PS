using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameObserver.Models
{
    public class GameDetails
    {
        public MatchModel matchModel { get; set; }
        public ClubModel clubvisitor { get; set; }
        public ClubModel clubagainst { get; set; }
    }
}