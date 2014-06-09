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
        IEnumerable<Club> GetAllClubs();
        IEnumerable<Formation> GetAllFormations();

        void CreateTeam(Team team);

        Club GetClub(int id);
        Formation GetFormation(int id);

        IEnumerable<Actor> GetPlayers(String sub);

        void InsertPlayersOnTeam(int idplayer, int idclub, DateTime date, int onfield);



        void RemovePlayersOnTeam(int idplayer, int idclub, DateTime date);

        IEnumerable<Stadium> GetAllStadiums();
        IEnumerable<Actor> GetAllReferees();
        IEnumerable<Actor> GetAllPlayers();
        IEnumerable<Team> GetAllTeams();

        Team GetTeam(DateTime date, int idclub);

        IEnumerable<Actor> GetPlayersByTeam(Team team);

        void CreateMatch(Referee first, Referee second, Referee third, Referee four, Team home, Team away,
            Stadium stadium, DateTime date);
    }
}
