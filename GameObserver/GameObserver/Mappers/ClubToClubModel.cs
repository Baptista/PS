using System;
using System.Collections.Generic;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class ClubToClubModel:IMapper<Club,ClubModel>
    {
        public ClubModel Map(Club source)
        {
            if (source == null) { throw new ArgumentException();}
            return new ClubModel()
            {
                Id = source.Id,
                Name = source.Name,
                Established = source.Established,
                Symbol = source.Symbol
            };
        }

        public IEnumerable<ClubModel> MapAll(IEnumerable<Club> source)
        {
            foreach (Club club in source)
            {
                yield return Map(club);
            }
        }
    }
}