using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gamestats.Entity
{
    public class GameSetUp
    {
        public int id { get; set; }
        public String stadium { get; set; }
        public String formation { get; set; }
        public IEnumerable<GamePlayer> homeTeam { get; set; }
        public IEnumerable<GamePlayer> AwayTeam { get; set; }
        public String nameHomeTeam { get; set; }
        public String nameAwayTeam { get; set; }
    }
}
