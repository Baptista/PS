using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class LayoutToLayoutModel:IMapper<Layout,LayoutModel>
    {
        public LayoutModel Map(Layout source)
        {
            if (source == null) { throw new ArgumentException();}
            return new LayoutModel()
            {
                DateAgainst = source.DateAgainst,
                IdStadium = source.IdStadium,
                DateMatch = source.DateMatch,
                DateVisitor = source.DateVisitor,
                IdAgainst = source.IdAgainst,
                IdVisitor = source.IdVisitor,
                Hourminute = source.Hourminute,
                Svg = source.Svg
            };
        }

        public IEnumerable<LayoutModel> MapAll(IEnumerable<Layout> source)
        {
            foreach (var layout in source)
            {
                yield return Map(layout);
            }
        }
    }
}