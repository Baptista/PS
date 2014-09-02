using System.Collections.Generic;


namespace GameObserver.Models
{
    public class TeamCreateModel
    {
        public IEnumerable<ClubModel> AllClubs { get; set; }
        public IEnumerable<FormationModel> AllFormations { get; set; } 
    }
}