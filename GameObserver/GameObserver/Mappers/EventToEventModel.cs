using System;
using System.Collections.Generic;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class EventToEventModel : IMapper<Event,EventModel>
    {
        public EventModel Map(Event source)
        {
            if (source == null) { throw new ArgumentException();}
            return new EventModel()
            {
                Id = source.Id,
                Icone = source.Icone,
                Type = source.Type
            };
        }

        public IEnumerable<EventModel> MapAll(IEnumerable<Event> source)
        {
            foreach (var ev in source)
            {
                yield return Map(ev);
            }
        }
    }
}