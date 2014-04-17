using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Gamestats.Entity;

namespace Gamestats.Mappers
{
    public class GameEvent_To_GameEventModel : IDataMapper<GameEvent, GameEventModels>
    {
        public GameEventModels Map(GameEvent source)
        {
            if (source == null) { throw new ArgumentException();}

            return new GameEventModels()
            {
                id = source.Id,
                desc = source.Desc,
                acronym = source.Acronym
            };
        }

        public IEnumerable<GameEventModels> MapAll(IEnumerable<GameEvent> source)
        {
            foreach (var gameEvent in source)
            {
                yield return Map(gameEvent);
            }
        }
    }
}
