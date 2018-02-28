using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using trunk.Controllers.Resources;
using trunk.Core.Models;
using trunk.Persistence;
using System.Linq;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace trunk.Controllers
{
    [Route("/api/vehicles")]
    public class VehicleController : Controller
    {
        private readonly IMapper mapper;
        private readonly AppDbContext context;
        private readonly ILogger<VehicleController> logger;
        public VehicleController(IMapper mapper, AppDbContext context, ILogger<VehicleController> logger)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            logger.LogInformation(1000, "ModelState.IsValid: {0}", ModelState.IsValid.ToString());

            //input validation using data annotations
            if (ModelState.IsValid == false)
            {
                var query = from state in ModelState.Values
                            from error in state.Errors
                            select error.ErrorMessage;

                var errorList = query.ToList();

                logger.LogError(1000, "ModelState.Values.Length: {0} \n\t {1}", errorList.Count() , String.Join(",", errorList));
                
                return BadRequest(ModelState);
            }

            //bussiness rules validation
            var model = await context.Models.FindAsync(vehicleResource.ModelId);
            if (model == null)
            {
                ModelState.AddModelError("ModelId","Invalid input ModelId.");

                logger.LogError(1000, "Invalid ModelId {0}.", vehicleResource.ModelId);

                return BadRequest(ModelState);
            }

            foreach (var item in vehicleResource.Features)
            {
                var feature = await context.Features.FindAsync(item);

                if (feature == null)
                {
                    ModelState.AddModelError("Feature","Invalid input FeatureId.");

                    logger.LogError(1000, "There is some featureId invalid.");

                    return BadRequest(ModelState);
                }
            }

            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpPut("{id}")] 
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            var vehicle = await context.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);

            if (vehicle == null)
                return NotFound();

            mapper.Map<VehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            await context.SaveChangesAsync();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        // [HttpPost]
        // public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        // {
        //     if (!ModelState.IsValid)
        //     return BadRequest(ModelState);

        //     var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
        //     vehicle.LastUpdate = DateTime.Now;

        //     context.Vehicles.Add(vehicle);
        //     await context.SaveChangesAsync();

        //     var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

        //     return Ok(result);
        // }

        // [HttpPut("{id}")] 
        // public async Task<IActionResult> UpdateVehicle(int id, [FromBody] VehicleResource vehicleResource)
        // {
        //     if (!ModelState.IsValid)
        //     return BadRequest(ModelState);

        //     var vehicle = await context.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);

        //     if (vehicle == null)
        //     return NotFound();

        //     mapper.Map<VehicleResource, Vehicle>(vehicleResource, vehicle);
        //     vehicle.LastUpdate = DateTime.Now;

        //     await context.SaveChangesAsync();

        //     var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

        //     return Ok(result);
        // }

        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteVehicle(int id)
        // {
        //     var vehicle = await context.Vehicles.FindAsync(id);

        //     if (vehicle == null)
        //     return NotFound();

        //     context.Remove(vehicle);
        //     await context.SaveChangesAsync();

        //     return Ok(id);
        // }

        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetVehicle(int id)
        // {
        //     var vehicle = await context.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);

        //     if (vehicle == null)
        //     return NotFound();

        //     var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);

        //     return Ok(vehicleResource);
        // }
    }
}