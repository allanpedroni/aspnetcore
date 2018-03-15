using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using trunk.Core;
using trunk.Core.Models;
using trunk.Extensions;

namespace trunk.Persistence.Repository
{
    public class PhotoRepository : IPhotoRepository
    {
        public AppDbContext context { get; }

        public PhotoRepository(AppDbContext dbContext)
        {
            context = dbContext;
        }

        public async Task<IEnumerable<Photo>> GetPhotosAsync(int vehicleId)
        {
            return await context.Photos
                .Where(p => p.VehicleId == vehicleId)
                .ToListAsync();
        }
    }
}
