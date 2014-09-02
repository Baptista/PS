using System;
using System.Collections.Generic;
using GameObserver.DomainModel.Entities;
using GameObserver.Models;

namespace GameObserver.Mappers
{
    public class FormationToFormationModel : IMapper<Formation,FormationModel>
    {
        public FormationModel Map(Formation source)
        {
            if (source == null) { throw new ArgumentException();}
            return new FormationModel()
            {
                Id = source.Id,
                Designation = source.Designation
            };
        }

        public IEnumerable<FormationModel> MapAll(IEnumerable<Formation> source)
        {
            foreach (Formation formation in source)
            {
                yield return Map(formation);
            }
        }
    }
}