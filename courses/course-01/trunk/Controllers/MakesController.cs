using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using trunk.Controllers.Resources;
using trunk.Core.Models;
using trunk.Persistence;

namespace trunk.Controllers
{
    public class MakesController : Controller
    {
        private readonly AppDbContext context;
        private readonly IMapper mapper;
        private readonly ILogger<MakesController> _logger;
        
        public MakesController(AppDbContext context, IMapper mapper, ILogger<MakesController> logger)
        {
            this._logger = logger;
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            _logger.LogInformation(1000, "In Index method..............");

            var makes = await context.Makes.Include(m => m.Models).ToListAsync();

            return mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}