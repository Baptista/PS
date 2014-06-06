using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameObserver.Mappers
{
    public interface IMapper<S, T>
    {
        /// <summary>
        /// Maps an object of type 'T' to an object of type 'S'.
        /// </summary>
        /// <param name="source"></param>
        /// <returns>A 'T' object</returns>
        /// <exception cref="ArgumentNullException"> if source is null</exception>
        T Map(S source);
        IEnumerable<T> MapAll(IEnumerable<S> source);

    }
}
