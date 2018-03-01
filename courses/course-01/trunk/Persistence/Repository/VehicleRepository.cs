using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using trunk.Core.Models;

namespace trunk.Persistence.Repository
{
    public class VehicleRepository
    {
        public AppDbContext context { get; }

        public VehicleRepository(AppDbContext context)
        {
            context = context;
        }

        public async Task<Vehicle> GetVehicle(int id) => await context.Vehicles
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                    .ThenInclude(vf => vf.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
    }
}
