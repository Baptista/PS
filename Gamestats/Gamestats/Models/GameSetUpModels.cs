using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gamestats.Models
{
    public class GameSetUpModels
    {
        public int id { get; set; }
        public String stadium { get; set; }
        public String formation { get; set; }
        public IEnumerable<GamePlayerModels> homeTeam { get; set; }
        public IEnumerable<GamePlayerModels> AwayTeam { get; set; }
        public String nameHomeTeam { get; set; }
        public String nameAwayTeam { get; set; }
    }
}