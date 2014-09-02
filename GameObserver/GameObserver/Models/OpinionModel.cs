using System;

namespace GameObserver.Models
{
    public class OpinionModel
    {
        public DateTime Date { get; set; }
        public Boolean Negative { get; set; }
        public String IdUser { get; set; }
        public int IdStadium { get; set; }
        public DateTime DateInstant { get; set; }
        public DateTime DataPartida { get; set; }
        public DateTime DateVisitor { get; set; }
        public int IdVisitor { get; set; }
        public DateTime DateAgainst { get; set; }
        public int IdAgainst { get; set; }

    }
}