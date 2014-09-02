using System;
using System.Collections.Generic;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class InstantToInstantModel : IMapper<Instant , InstantModel>
    {
        public InstantModel Map(Instant source)
        {
            if (source == null) { throw new ArgumentException();}
            return new InstantModel()
            {
                DateAgainst = source.DateAgainst,
                DateMatch = source.DateMatch,
                DateVisitor = source.DateVisitor,
                IdAgainst = source.IdAgainst,
                IdCause = source.IdCause,
                IdExecute = source.IdExecute,
                IdStadium = source.IdStadium,
                IdUser = source.IdUser,
                IdVisitor = source.IdVisitor,
                MinuteSeconds = source.MinuteSeconds,
                IdEvent = source.IdEvent
            };
        }

        public IEnumerable<InstantModel> MapAll(IEnumerable<Instant> source)
        {
            foreach (var instant in source)
            {
                yield return Map(instant);
            }
        }
    }
}