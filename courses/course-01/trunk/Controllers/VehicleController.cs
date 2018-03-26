using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using trunk.Controllers.Resources;
using trunk.Core.Models;
using System.Linq;
using Microsoft.Extensions.Logging;
using trunk.Core;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace trunk.Controllers
{
    [Route("/api/vehicles")]
    public class VehicleController : Controller
    {
        private readonly IMapper mapper;

        private readonly ILogger<VehicleController> logger;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public VehicleController(IMapper mapper, ILogger<VehicleController> logger, IVehicleRepository vehicleRepository, IUnitOfWork unitOfWork)
        {
            this.logger = logger;
            this.repository = vehicleRepository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
        {
            logger.LogInformation(1000, "ModelState.IsValid: {0}", ModelState.IsValid.ToString());

            //input validation using data annotations
            if (!ModelState.IsValid)
            {
                var query = from state in ModelState.Values
                            from error in state.Errors
                            select error.ErrorMessage;

                var errorList = query.ToList();

                logger.LogError(1000, "ModelState.Values.Length: {0} \n\t {1}", errorList.Count() , String.Join(",", errorList));
                
                return BadRequest(ModelState);
            }

            //## bussiness rules validation
            //## var model = await context.Models.FindAsync(vehicleResource.ModelId);
            //## if (model == null)
            //## {
            //##     ModelState.AddModelError("ModelId","Invalid input ModelId.");
            //## 
            //##     logger.LogError(1000, "Invalid ModelId {0}.", vehicleResource.ModelId);
            //## 
            //##     return BadRequest(ModelState);
            //## }
            //## 
            //## foreach (var item in vehicleResource.Features)
            //## {
            //##     var feature = await context.Features.FindAsync(item);
            //## 
            //##     if (feature == null)
            //##     {
            //##         ModelState.AddModelError("Feature","Invalid input FeatureId.");
            //## 
            //##         logger.LogError(1000, "There is some featureId invalid.");
            //## 
            //##         return BadRequest(ModelState);
            //##     }
            //## }

            var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            repository.Add(vehicle);
            await unitOfWork.CompleteAsync();

            vehicle = await repository.GetVehicle(vehicle.Id);

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            var vehicle = await repository.GetVehicle(id);

            if (vehicle == null)
                return NotFound();

            mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            await unitOfWork.CompleteAsync();

            vehicle = await repository.GetVehicle(vehicle.Id);

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await repository.GetVehicle(id, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            repository.Remove(vehicle);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await repository.GetVehicle(id);

            if (vehicle == null)
                return NotFound();

            var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }

        [HttpGet]
        public async Task<QueryResultResource<VehicleResource>> GetVehicles(VehicleQueryResource filterResource)
        {
            var filter = mapper.Map<VehicleQueryResource, VehicleQuery>(filterResource);

            var vehicle = await repository.GetVehicles(filter);

            return  mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(vehicle);
        }

        // [HttpGet]
        // public async Task<QueryResultResource<VehicleResource>> GetVehicles(VehicleQueryResource filterResource)
        // {
        // var filter = mapper.Map<VehicleQueryResource, VehicleQuery>(filterResource);
        // var queryResult = await repository.GetVehicles(filter);

        // return mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult);
        // }
    }
}