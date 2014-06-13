using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class PositionToPositionModel:IMapper<Position,PositionModel>
    {
        public PositionModel Map(Position source)
        {
            if (source == null) { throw new ArgumentException();}
            return new PositionModel()
            {
                Id = source.Id,
                Designation = source.Designation
            };
        }

        public IEnumerable<PositionModel> MapAll(IEnumerable<Position> source)
        {
            foreach (var position in source)
            {
                yield return Map(position);
            }
        }
    }
}