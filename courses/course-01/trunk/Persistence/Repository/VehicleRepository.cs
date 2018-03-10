using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using trunk.Core;
using trunk.Core.Models;

namespace trunk.Persistence.Repository
{
    public class VehicleRepository : IVehicleRepository
    {
        public AppDbContext context { get; }

        public VehicleRepository(AppDbContext dbContext)
        {
            context = dbContext;
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (includeRelated == false)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
                .Include(v => v.Features).ThenInclude(vf => vf.Feature)
                .Include(v => v.Model).ThenInclude(vf => vf.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            context.Vehicles.Remove(vehicle);
        }
        
        public async Task<IEnumerable<Vehicle>> GetVehicles(Filter filter)
        {
            var query = context.Vehicles
                .Include(v => v.Features).ThenInclude(vf => vf.Feature)
                .Include(v => v.Model).ThenInclude(vf => vf.Make)
                .AsQueryable();

            if (filter.MakeId.HasValue)
                query = query.Where(w => w.Model.MakeId == filter.MakeId.Value);

            return await query.ToListAsync();
        }
    }
}
