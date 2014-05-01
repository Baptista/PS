using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Gamestats.Models
{
    public class AddPlayerToGameSetUp
    {
        public GameSetUpModels gameSetUpModels { get; set; }
        public IEnumerable<GamePlayerModels> gamePlayerHome { get; set; }
        public IEnumerable<GamePlayerModels> gamePlayerAway { get; set; }
    }
}