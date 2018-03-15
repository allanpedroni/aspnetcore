using System.Collections.Generic;
using System.Threading.Tasks;
using trunk.Core.Models;

namespace trunk.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotosAsync(int vehicleId);
    }
}
