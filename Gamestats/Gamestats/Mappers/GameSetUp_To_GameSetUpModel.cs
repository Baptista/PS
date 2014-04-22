using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Gamestats.Entity;
using Gamestats.Models;

namespace Gamestats.Mappers
{
    public class GameSetUp_To_GameSetUpModel : IDataMapper<GameSetUp,GameSetUpModels>
    {
        public GameSetUpModels Map(GameSetUp source)
        {
            if (source == null) { throw new ArgumentException();}
            return new GameSetUpModels()
            {
                id = source.id,
                stadium = source.stadium,
                formation = source.formation,
                nameHomeTeam = source.nameHomeTeam,
                nameAwayTeam = source.nameAwayTeam
            };
        }

        public IEnumerable<GameSetUpModels> MapAll(IEnumerable<GameSetUp> source)
        {
            foreach (var gameSetUp in source)
            {
                yield return Map(gameSetUp);
            }
        }
    }
}