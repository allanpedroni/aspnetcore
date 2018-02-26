using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using trunk.Controllers.Resources;
using trunk.Core.Models;

namespace trunk.Controllers
{
    [Route("/api/vehicles")]
    public class VehicleController : Controller
    {
        private readonly IMapper mapper;
        public VehicleController(IMapper mapper)
        {
            this.mapper = mapper;

        }

        [HttpPost]
        public IActionResult CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            return Ok(vehicle);
        }
    }
}