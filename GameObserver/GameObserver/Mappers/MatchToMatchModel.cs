using System;
using System.Collections.Generic;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class MatchToMatchModel:IMapper<Match,MatchModel>
    {
        public MatchModel Map(Match source)
        {
            if (source == null) { throw new ArgumentException();}
            return new MatchModel()
            {
                Date = source.Date,
                DateAgainst = source.DateAgainst,
                DateVisitor = source.DateVisitor,
                IdAgainst = source.IdAgainst,
                IdVisitor = source.IdVisitor,
                IdFirstReferee = source.IdFirstReferee,
                IdSecondReferee = source.IdSecondReferee,
                IdThirdReferee = source.IdThirdReferee,
                IdFourReferee = source.IdFourReferee,
                IdStadium = source.IdStadium
            };
        }

        public IEnumerable<MatchModel> MapAll(IEnumerable<Match> source)
        {
            foreach (var match in source)
            {
                yield return Map(match);
            }
        }
    }
}