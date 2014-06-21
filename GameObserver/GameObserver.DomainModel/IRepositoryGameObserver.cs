using System;
using System.Collections.Generic;
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
    }
}
