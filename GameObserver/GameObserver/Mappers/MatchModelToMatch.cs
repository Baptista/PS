using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class MatchModelToMatch:IMapper<MatchModel,Match>
    {
        public Match Map(MatchModel source)
        {
            if (source == null) { throw new ArgumentException();}
            
            return new Match()
            {
                Date = source.Date,
                DateAgainst = source.DateAgainst,
                DateVisitor = source.DateVisitor,
                IdAgainst = source.IdAgainst,
                IdFirstReferee = source.IdFirstReferee,
                IdFourReferee = source.IdFourReferee,
                IdSecondReferee = source.IdSecondReferee,
                IdThirdReferee = source.IdThirdReferee,
                IdStadium = source.IdStadium,
                IdVisitor = source.IdVisitor
            };
        }

        public IEnumerable<Match> MapAll(IEnumerable<MatchModel> source)
        {
            foreach (var matchModel in source)
            {
                yield return Map(matchModel);
            }
        }
    }
}