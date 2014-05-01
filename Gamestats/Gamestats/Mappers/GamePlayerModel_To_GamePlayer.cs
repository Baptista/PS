using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Gamestats.Entity;
using Gamestats.Models;

namespace Gamestats.Mappers
{
    public class GamePlayerModel_To_GamePlayer : IDataMapper<GamePlayerModels, GamePlayer>
    {
        public GamePlayer Map(GamePlayerModels source)
        {
            if (source == null) { throw new ArgumentException();}
            return new GamePlayer()
            {
                Id = source.Id,
                Name = source.Name,
                Img = source.Img,
                ImgType = source.ImgType,
                Club = source.Club,
                Position = source.Position,
                Born = source.Born,
                Nationality = source.Nationality,
                Titles = source.Titles,
                Facebook = source.Facebook,
                Height = source.Height,
                Weight = source.Weight
            };
        }

        public IEnumerable<GamePlayer> MapAll(IEnumerable<GamePlayerModels> source)
        {
            foreach (var gamePlayerModels in source)
            {
                yield return Map(gamePlayerModels);
            }
        }
    }
}