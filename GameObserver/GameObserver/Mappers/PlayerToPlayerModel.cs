using System;
using System.Collections.Generic;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class PlayerToPlayerModel:IMapper<Player,PlayerModel>
    {
        public PlayerModel Map(Player source)
        {
            if (source == null) { throw new ArgumentException();}
            return new PlayerModel()
            {
                Id = source.Id,
                IdClub = source.IdClub
            };
        }

        public IEnumerable<PlayerModel> MapAll(IEnumerable<Player> source)
        {
            foreach (var player in source)
            {
                yield return Map(player);
            }
        }
    }
}