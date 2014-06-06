using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class TeamModelToTeam:IMapper<TeamModel,Team>
    {
        public Team Map(TeamModel source)
        {
            if (source == null) { throw new ArgumentException();}
            return new Team() {Data = source.Data, IdClub = source.IdClub, IdFormation = source.IdFormation};
        }

        public IEnumerable<Team> MapAll(IEnumerable<TeamModel> source)
        {
            foreach (TeamModel teamModel in source)
            {
                yield return Map(teamModel);
            }
        }
    }
}