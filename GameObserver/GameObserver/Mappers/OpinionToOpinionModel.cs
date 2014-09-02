using System;
using System.Collections.Generic;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class OpinionToOpinionModel:IMapper<Opinion, OpinionModel>
    {
        public OpinionModel Map(Opinion source)
        {
            if (source == null) { throw new ArgumentException();}
            return new OpinionModel()
            {
                DataPartida = source.DataPartida,
                Date = source.Date,
                DateAgainst = source.DateAgainst,
                DateInstant = source.DateInstant,
                DateVisitor = source.DateVisitor,
                IdAgainst = source.IdAgainst,
                IdStadium = source.IdStadium,
                IdUser = source.IdUser,
                IdVisitor = source.IdVisitor,
                Negative = source.Negative
            };
        }

        public IEnumerable<OpinionModel> MapAll(IEnumerable<Opinion> source)
        {
            foreach (var opinion in source)
            {
                yield return Map(opinion);
            }
        }
    }
}