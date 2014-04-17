using System;
using System.Collections.Generic;

namespace Gamestats.Entity
{
    public class GamePlayer
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public String Img { get; set; }
        public IEnumerable<GameEvent> GameEvents { get; set; }
    }
}
