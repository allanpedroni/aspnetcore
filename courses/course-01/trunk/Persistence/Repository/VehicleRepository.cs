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
        
        public async Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            var query = context.Vehicles
                .Include(v => v.Features).ThenInclude(vf => vf.Feature)
                .Include(v => v.Model).ThenInclude(vf => vf.Make)
                .AsQueryable();

            if (queryObj.MakeId.HasValue)
                query = query.Where(w => w.Model.MakeId == queryObj.MakeId.Value);

            if (queryObj.ModelId.HasValue)
                query = query.Where(w => w.Model.Id == queryObj.ModelId.Value);

            if (queryObj.SortBy == "make")
                query = (queryObj.IsSortAscending ) ? query.OrderBy(v => v.Model.Make.Name) : query.OrderByDescending(v => v.Model.Make.Name);

            if (queryObj.SortBy == "model")
                query = (queryObj.IsSortAscending ) ? query.OrderBy(v => v.Model.Name) : query.OrderByDescending(v => v.Model.Name);

            if (queryObj.SortBy == "contactName")
                query = (queryObj.IsSortAscending ) ? query.OrderBy(v => v.ContactName) : query.OrderByDescending(v => v.ContactName);

            if (queryObj.SortBy == "id")
                query = (queryObj.IsSortAscending ) ? query.OrderBy(v => v.Id) : query.OrderByDescending(v => v.Id);

            return await query.ToListAsync();
        }
    }
}
