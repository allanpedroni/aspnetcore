using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using trunk.Controllers.Resources;
using trunk.Core.Models;
using trunk.Persistence;
using System.Linq;

namespace trunk.Controllers
{
    public class VehicleController : Controller
    {
        private readonly IMapper mapper;
        private readonly AppDbContext context;
        public VehicleController(IMapper mapper, AppDbContext context)
        {
            this.context = context;
            this.mapper = mapper;

        }

        [HttpPost("/api/vehicles")]
        public async Task<IActionResult> CreateVehicleAsync([FromBody] VehicleResource vehicleResource)
        {
            //input validation using data annotations
            if (ModelState.IsValid)
            {
                var query = from state in ModelState.Values
                  from error in state.Errors
                  select error.ErrorMessage;

                var errorList = query.ToList();

                return BadRequest(ModelState);
            }
                

            //bussiness rules validation
            var model = await context.Models.FindAsync(vehicleResource.ModelId);
            if (model == null)
            {
                ModelState.AddModelError("ModelId","Invalid ModelId");
                return BadRequest(ModelState);
            }

            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            
            return Ok(result);
        }
    }
}