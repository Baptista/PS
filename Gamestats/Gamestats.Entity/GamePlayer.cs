using System;
using System.Collections.Generic;

namespace Gamestats.Entity
{
    public class GamePlayer
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public String Img { get; set; }
        public String ImgType { get; set; }
        public String Club { get; set; }
        public String Position { get; set; }
        public DateTime Born { get; set; }
        public String Nationality { get; set; }
        public String Titles { get; set; }
        public String Facebook { get; set; }
        public double Height { get; set; }
        public int Weight { get; set; }

    }
}
