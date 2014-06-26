using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class AssociateToAssociateModel: IMapper<Associate,AssociateModel>
    {
        public AssociateModel Map(Associate source)
        {
            if (source == null) { throw new ArgumentException();}
            return new AssociateModel()
            {
                Date = source.Date,
                IdUser = source.IdUser,
                IdEvent = source.IdEvent
            };
        }

        public IEnumerable<AssociateModel> MapAll(IEnumerable<Associate> source)
        {
            foreach (var associate in source)
            {
                yield return Map(associate);
            }
        }
    }
}