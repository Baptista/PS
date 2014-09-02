using System;

namespace GameObserver.Models
{
    public class TeamModel
    {
        public DateTime Data { get; set; }
        public int IdClub { get; set; }
        public int IdFormation { get; set; }
        public String NameClub { get; set; }
        public String Formation { get; set; }
        public String PhotoClub { get; set; }
    }
}