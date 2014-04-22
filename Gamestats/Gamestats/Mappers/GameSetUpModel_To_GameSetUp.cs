using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Gamestats.Entity;
using Gamestats.Models;

namespace Gamestats.Mappers
{
    public class GameSetUpModel_To_GameSetUp :IDataMapper<GameSetUpModels, GameSetUp>
    {
        public GameSetUp Map(GameSetUpModels source)
        {
            if (source == null) { throw new ArgumentException();}
            return new GameSetUp()
            {
                id = source.id,
                stadium = source.stadium,
                formation = source.formation,
                nameHomeTeam = source.nameHomeTeam,
                nameAwayTeam = source.nameAwayTeam
            };
        }

        public IEnumerable<GameSetUp> MapAll(IEnumerable<GameSetUpModels> source)
        {
            foreach (var gameSetUpModelse in source)
            {
                yield return Map(gameSetUpModelse);
            }
        }
    }
}