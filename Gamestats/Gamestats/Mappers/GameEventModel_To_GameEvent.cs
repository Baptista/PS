using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Gamestats.Entity;
using Gamestats.Models;

namespace Gamestats.Mappers
{
    public class GameEventModel_To_GameEvent : IDataMapper<GameEventModels,GameEvent>
    {
        public GameEvent Map(GameEventModels source)
        {
            if (source == null) { throw new ArgumentException();}

            return new GameEvent()
            {
                Id = source.id,
                Desc = source.desc,
                Acronym = source.acronym
            }
            ;
        }

        public IEnumerable<GameEvent> MapAll(IEnumerable<GameEventModels> source)
        {
            foreach (var gameEventModels in source)
            {
                yield return Map(gameEventModels);
            }
        }
    }
}
