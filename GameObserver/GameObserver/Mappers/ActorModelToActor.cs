using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class ActorModelToActor:IMapper<ActorModel,Actor>
    {
        public Actor Map(ActorModel source)
        {
            if (source == null) { throw new ArgumentException();}
            return new Actor()
            {
                Id = source.Id,
                Name = source.Name,
                Born = source.Born,
                Height = source.Height,
                Photo = source.Photo,
                Weight = source.Weight,
                Player = source.Player,
                Referee = source.Referee
            };
        }

        public IEnumerable<Actor> MapAll(IEnumerable<ActorModel> source)
        {
            foreach (ActorModel actorModel in source)
            {
                yield return Map(actorModel);
            }
        }
    }
}