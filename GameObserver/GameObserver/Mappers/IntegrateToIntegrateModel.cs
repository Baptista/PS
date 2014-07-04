using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class IntegrateToIntegrateModel:IMapper<Integrate,IntegrateModel>
    {
        public IntegrateModel Map(Integrate source)
        {
            if (source == null) { throw new ArgumentException();}
            return new IntegrateModel()
            {
                IdClub = source.IdClub,
                Date = source.Date,
                IdPosition = source.IdPosition,
                IdPlayer = source.IdPlayer
            };
        }

        public IEnumerable<IntegrateModel> MapAll(IEnumerable<Integrate> source)
        {
            foreach (var integrate in source)
            {
                yield return Map(integrate);
            }
        }
    }
}