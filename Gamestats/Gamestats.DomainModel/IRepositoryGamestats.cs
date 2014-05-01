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
        /// Eventos
        
        IEnumerable<GameEvent> GetEvents(String Acronym);
        IEnumerable<GameEvent> GetAllEvents();
        void CreateEvent(GameEvent gameevent);
        void UpdadeEvent(GameEvent gameEvent);
        GameEvent GetEvent(int id);
        void DeleteEvent(int id);
        
        /// Player
        void CreatePlayer(GamePlayer gamePlayer);
        void UpdatePlayer(GamePlayer gameEvent);
        GamePlayer GetPlayer(int id);
        IEnumerable<GamePlayer> GetAllPlayers(); 
        void DeletePlayer(int id);

        IEnumerable<GamePlayer> GetAllPlayers(String club , String position); 

        //GameSetUp
        void CreateGameSetUp(GameSetUp gameSetUp);
        GameSetUp GetGameSetUp(int id);
        IEnumerable<GameSetUp> GetAllGameSetUps();
        void UpdateSetUp(GameSetUp gameSetUp);
        void DeleteSetUp(int id);
    }
}
