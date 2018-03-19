using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using trunk.Controllers.Resources;
using trunk.Core.Models;
using trunk.Persistence;

namespace trunk.Controllers
{
    public class FeaturesController
    {
        private readonly AppDbContext context;
        private readonly IMapper mapper;
        private readonly ILogger<FeaturesController> _logger;
        public FeaturesController(AppDbContext context, IMapper mapper, ILogger<FeaturesController> logger)
        {
            this._logger = logger;
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/features")]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
        {
            var features = await context.Features.ToListAsync();
        
            return mapper.Map<List<Feature>, List<KeyValuePairResource>>(features); 
        }
    }
}