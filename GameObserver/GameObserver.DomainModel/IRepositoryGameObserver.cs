using System;
using System.Collections.Generic;
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
        
        Boolean IsPlayer(int id);

        void DeleteOpinionsByInstant(DateTime date);
        void DeleteInstant(DateTime date);

        Club GetClub(int id);
        Formation GetFormation(int id);

        Position GetPlayerPosition(int idplayer);
        Position GetPosition(int id);

        void InsertPlayersOnTeam(int idplayer, int idclub, DateTime date, int idpos);



        IEnumerable<Stadium> GetAllStadiums();
        IEnumerable<Actor> GetAllReferees();

        Actor GetReferee(int id);

        IEnumerable<Team> GetAllTeams();

        Team GetTeam(DateTime date, int idclub);

        IEnumerable<Integrate> GetPlayersByTeam(int idclub, DateTime date);

        void CreateMatch(Match match);

        IEnumerable<Match> GetAllMatches();


        IEnumerable<Event> GetAllEvents();

        void CreateInstant(DateTime minutosegundo , int idestadio , DateTime datahora , DateTime datavisitante , int idvisitante,
            DateTime datadefronta , int iddefronta , String idutilizador, int causou , int? executou , DateTime datahoraopiniao , 
            int negativa , int idevento);


        

        void CreateOpinionUser(DateTime minutosegundo, int idestadio, DateTime datahora, DateTime datavisitante,
            int idvisitante,
            DateTime datadefronta, int iddefronta, String idutilizador, DateTime datahoraopiniao,String opinion);

        
        IEnumerable<Instant> GetAllInstant(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag);


        IEnumerable<Instant> GetAllInstantByCause(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, int cause);


        int GetOpinionByInstant(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, String opinion, DateTime min);
        Opinion GetAllOpinionsByInstant(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag , DateTime minitosegundo , String idutilizador);

        int GetUserOpinionByEvent(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, String idutilizador, int idevent,
            String negative);

        int GetOpinionByEvent(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, int idevent,
            String negative);

        Instant GetInstant(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, DateTime instante);

        IEnumerable<Instant> GetAllInstantDescDate(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag);

        //void InsertUser(String name, int idrole);

       

        void UpdateIntegrate(int idclub, DateTime date, int idplayer, int position);


    }
}
