using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Gamestats.Entity;
using Gamestats.Models;

namespace Gamestats.Mappers
{
    public class GamePlayer_To_GamePlayerModel : IDataMapper<GamePlayer ,GamePlayerModels>
    {
        public GamePlayerModels Map(GamePlayer source)
        {
            if (source == null) { throw new ArgumentException();}
            return new GamePlayerModels()
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

        public IEnumerable<GamePlayerModels> MapAll(IEnumerable<GamePlayer> source)
        {
            foreach (GamePlayer gamePlayer in source)
            {
                yield return Map(gamePlayer);
            }
        }
    }
}