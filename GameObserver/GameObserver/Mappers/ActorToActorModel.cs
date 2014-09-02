using System;
using System.Collections.Generic;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class ActorToActorModel:IMapper<Actor,ActorModel>
    {
        public ActorModel Map(Actor source)
        {
            if (source == null) { throw new ArgumentException();}
            return new ActorModel()
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

        public IEnumerable<ActorModel> MapAll(IEnumerable<Actor> source)
        {
            foreach (Actor actor in source)
            {
                yield return Map(actor);
            }
        }
    }
}