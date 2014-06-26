using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GameObserver.DomainModel.Entities;

namespace GameObserver.DomainModel
{
    public interface IRepositoryGameObserver
    {

        Stadium GetStadium(int id);

        IEnumerable<Club> GetAllClubs();
        IEnumerable<Formation> GetAllFormations();

        void CreateTeam(Team team);

        Actor GetPlayer(int id);

        Event GetEvent(int id);

        Club GetClub(int id);
        Formation GetFormation(int id);

        IEnumerable<Actor> GetPlayers(String sub);

        Position GetPosition(int idplayer);
        

        void InsertPlayersOnTeam(int idplayer, int idclub, DateTime date, int onfield);



        void RemovePlayersOnTeam(int idplayer, int idclub, DateTime date);

        IEnumerable<Stadium> GetAllStadiums();
        IEnumerable<Actor> GetAllReferees();

        Actor GetReferee(int id);

        IEnumerable<Actor> GetAllPlayers();
        IEnumerable<Team> GetAllTeams();

        Team GetTeam(DateTime date, int idclub);

        IEnumerable<Actor> GetPlayersByTeam(Team team);

        void CreateMatch(Match match);

        IEnumerable<Match> GetAllMatches();


        IEnumerable<Event> GetAllEvents();

        void CreateOpinion(DateTime minutosegundo , int idestadio , DateTime datahora , DateTime datavisitante , int idvisitante,
            DateTime datadefronta , int iddefronta , int idutilizador, int causou , int? executou , DateTime datahoraopiniao , 
            int negativa , int idevento);


        //IEnumerable<Instant> GetOpinionByMatch(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
        //    int idequipag, DateTime dataequipag);

        IEnumerable<Instant> GetAllInstant(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag);


        IEnumerable<Opinion> GetAllOpinionsByInstant(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag , DateTime minitosegundo);

        IEnumerable<Associate> GetAllAssociatesbyOpinionEvent(DateTime datahora , int iduser);
    }
}
