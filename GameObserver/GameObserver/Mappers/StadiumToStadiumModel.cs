using System;
using System.Collections.Generic;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class StadiumToStadiumModel: IMapper<Stadium,StadiumModel>
    {
        public StadiumModel Map(Stadium source)
        {
            if (source == null) { throw new ArgumentException();}
            return new StadiumModel()
            {
                Id = source.Id,
                Name = source.Name,
                Morada = source.Morada,
                Capacity = source.Capacity
            };
        }

        public IEnumerable<StadiumModel> MapAll(IEnumerable<Stadium> source)
        {
            foreach (var stadium in source)
            {
                yield return Map(stadium);
            }
        }
    }
}