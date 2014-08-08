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

        Event GetEvent(int id); 
        Stadium GetStadium(int id);

        IEnumerable<Club> GetAllClubs();
        IEnumerable<Formation> GetAllFormations();

        void CreateTeam(int idFormation, int idClub, DateTime data);

        Actor GetActor(int id);
        Player GetPlayerWithClub(int id);

        IEnumerable<Actor> GetPlayersByClub(int idclub);
        //Actor GetClubByPlayer(int idplayer);

        Boolean IsPlayer(int id);
        



        Club GetClub(int id);
        Formation GetFormation(int id);

        IEnumerable<Actor> GetPlayers(String sub);

        Position GetPlayerPosition(int idplayer);
        Position GetPosition(int id);

        IEnumerable<Instant> GetInstantByCause(int idstadium, DateTime datehour, int idteamv, DateTime datateamv,
            int idteamg, DateTime datateamg,int id);

        //Instant GetLastInstant();

        void InsertPlayersOnTeam(int idplayer, int idclub, DateTime date, int idpos);



        void RemovePlayersOnTeam(int idplayer, int idclub, DateTime date);

        IEnumerable<Stadium> GetAllStadiums();
        IEnumerable<Actor> GetAllReferees();

        Actor GetReferee(int id);

        IEnumerable<Actor> GetAllPlayers();
        IEnumerable<Team> GetAllTeams();

        Team GetTeam(DateTime date, int idclub);

        IEnumerable<Integrate> GetPlayersByTeam(int idclub, DateTime date);

        void CreateMatch(Match match);

        IEnumerable<Match> GetAllMatches();


        IEnumerable<Event> GetAllEvents();

        void CreateOpinion(DateTime minutosegundo , int idestadio , DateTime datahora , DateTime datavisitante , int idvisitante,
            DateTime datadefronta , int iddefronta , String idutilizador, int causou , int? executou , DateTime datahoraopiniao , 
            int negativa , int idevento);


        void CreateOpinionUser(DateTime minutosegundo, int idestadio, DateTime datahora, DateTime datavisitante,
            int idvisitante,
            DateTime datadefronta, int iddefronta, String idutilizador, DateTime datahoraopiniao,String opinion);

        //IEnumerable<Instant> GetOpinionByMatch(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
        //    int idequipag, DateTime dataequipag);

        IEnumerable<Instant> GetAllInstant(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag);


        IEnumerable<Instant> GetAllInstantByCause(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, int cause);


        void InsertLayout(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag , DateTime horaminuto, String svg);


        Opinion GetAllOpinionsByInstant(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag , DateTime minitosegundo , String idutilizador);

        int GetUserOpinionByEvent(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, String idutilizador, int idevent,
            String negative);

        void InsertUser(String name, int idrole);

        Layout GetLayout(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag);


        void UpdateIntegrate(int idclub, DateTime date, int idplayer, int position);


    }
}
