using System;

namespace GameObserver.Models
{
    public class MatchModel
    {
        public int IdStadium { get; set; }
        public DateTime Date { get; set; }
        public int IdFirstReferee { get; set; }
        public int IdSecondReferee { get; set; }
        public int IdThirdReferee { get; set; }
        public int IdFourReferee { get; set; }
        public int IdVisitor { get; set; }
        public DateTime DateVisitor { get; set; }
        public int IdAgainst { get; set; }
        public DateTime DateAgainst { get; set; }
    }
}