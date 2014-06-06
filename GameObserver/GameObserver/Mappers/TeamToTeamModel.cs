using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class TeamToTeamModel:IMapper<Team,TeamModel>
    {
        public TeamModel Map(Team source)
        {
            if (source == null) { throw new ArgumentException();}
            return new TeamModel() {Data = source.Data, IdClub = source.IdClub, IdFormation = source.IdFormation};
        }

        public IEnumerable<TeamModel> MapAll(IEnumerable<Team> source)
        {
            foreach (Team team in source)
            {
                yield return Map(team);
            }
        }
    }
}