using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Gamestats.Entity;

namespace Gamestats.DomainModel
{
    public interface IRepositoryGamestats
    {
        IEnumerable<GameEvent> GetEvents(String Acronym);
        IEnumerable<GameEvent> GetAllEvents();
        void CreateEvent(GameEvent gameevent);
        void UpdadeEvent(int id);
        GameEvent GetEvent(int id);
    }
}
