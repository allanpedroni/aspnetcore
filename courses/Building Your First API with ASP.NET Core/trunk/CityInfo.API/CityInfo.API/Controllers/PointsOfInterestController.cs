using System.Linq;
using Microsoft.AspNetCore.Mvc;
using CityInfo.API.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;
using System;
using CityInfo.API.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CityInfo.API.Controllers
{
    [Route("api/cities")]
    public class PointsOfInterestController : Controller
    {
        private ILogger<PointsOfInterestController> _logger;
        private ILocalMailService _mailService;

        public PointsOfInterestController(ILogger<PointsOfInterestController> logger, ILocalMailService mailService)
        {
            _logger = logger;
            _mailService = mailService;
        }

        [HttpGet("{cityId}/pointsofinterest")]
        public IActionResult GetPointsOfInterest(int cityId)
        {
            try
            {
                //throw new Exception("erro");

                var cityToReturn = CitiesDataStore.Current.Cities.FirstOrDefault(f => f.Id == cityId);

                if (cityToReturn == null)
                {
                    _logger.LogInformation($"Cidade {cityId} não existe.");

                    return NotFound();
                }
                return Ok(cityToReturn.PointsOfInterest);
            }
            catch (System.Exception ex)
            {
                _logger.LogCritical($"Ocorreu um erro ao tentar obter a cidade {cityId}.");

                return StatusCode(500, "Problema ocorreu com a requisição.");
            }
        }

        [HttpGet("{cityId}/pointsofinterest/{id}", Name = "GetPointOfInterest")]
        public IActionResult GetPointOfInterest(int cityId, int id)
        {
            var cityToReturn = CitiesDataStore.Current.Cities.FirstOrDefault(f => f.Id == cityId);

            if (cityToReturn == null)
            {
                return NotFound();
            }

            var pointOfInterestToReturn = cityToReturn.PointsOfInterest.FirstOrDefault(f => f.Id == id);

            if (pointOfInterestToReturn == null)
            {
                return NotFound();
            }
            return Ok(pointOfInterestToReturn);
        }

        [HttpPost("{cityId}/pointsofinterest")]
        public IActionResult CreatePointOfInterest(int cityId,
            [FromBody] PointOfInterestForCreationDto pointsOfInterest)
        {
            if (pointsOfInterest == null)
            {
                return BadRequest();
            }

            if (pointsOfInterest.Description == pointsOfInterest.Name)
            {
                ModelState.AddModelError("Description", "A descrição não pode ser igual ao nome.");
            }

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            var cityToReturn = CitiesDataStore.Current.Cities.FirstOrDefault(f => f.Id == cityId);

            if (cityToReturn == null)
            {
                return NotFound();
            }

            var maxPointOfInterestId = CitiesDataStore.Current.Cities.SelectMany(f => f.PointsOfInterest)
                .Max(p => p.Id);

            var finalPointOfInterest = new PointOfInterestDto()
            {
                Id = ++maxPointOfInterestId,
                Name = pointsOfInterest.Name,
                Description = pointsOfInterest.Description
            };

            return CreatedAtRoute("GetPointOfInterest",
                new { cityId = cityId, id = finalPointOfInterest.Id }, finalPointOfInterest);
        }

        [HttpPut("{cityId}/pointsofinterest/{id}")]
        public IActionResult UpdatePointOfInterest(int cityId, int id,
            [FromBody] PointOfInterestForUpdateDto pointsOfInterest)
        {
            if (pointsOfInterest == null)
            {
                return BadRequest();
            }

            if (pointsOfInterest.Description == pointsOfInterest.Name)
            {
                ModelState.AddModelError("Description", "A descrição não pode ser igual ao nome.");
            }

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            var cityToReturn = CitiesDataStore.Current.Cities.FirstOrDefault(f => f.Id == cityId);

            if (cityToReturn == null)
            {
                return NotFound();
            }

            var pointOfInterestToReturn = cityToReturn.PointsOfInterest.FirstOrDefault(f => f.Id == id);

            if (pointOfInterestToReturn == null)
            {
                return NotFound();
            }

            pointOfInterestToReturn.Name = pointsOfInterest.Name;
            pointOfInterestToReturn.Description = pointsOfInterest.Description;

            //return the updated data
            return CreatedAtRoute("GetPointOfInterest",
                new { cityId = cityId, id = id }, pointOfInterestToReturn);
        }

        [HttpPatch("{cityId}/pointsofinterest/{id}")]
        public IActionResult PartiallyUpdatePointOfInterest(int cityId, int id,
            [FromBody] JsonPatchDocument<PointOfInterestForUpdateDto> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            var city = CitiesDataStore.Current.Cities.FirstOrDefault(f => f.Id == cityId);

            if (city == null)
            {
                return NotFound();
            }

            var pointOfInterestFromStore = city.PointsOfInterest.FirstOrDefault(f => f.Id == id);

            if (pointOfInterestFromStore == null)
            {
                return NotFound();
            }

            var pointOfInterestToPatch =
                new PointOfInterestForUpdateDto()
                {
                    Name = pointOfInterestFromStore.Name,
                    Description = pointOfInterestFromStore.Description
                };

            patchDoc.ApplyTo(pointOfInterestToPatch, ModelState);

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            if (pointOfInterestToPatch.Description == pointOfInterestToPatch.Name)
            {
                ModelState.AddModelError("Description", "A descrição não pode ser igual ao nome.");
            }

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            TryValidateModel(pointOfInterestToPatch);

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }

            pointOfInterestFromStore.Name = pointOfInterestToPatch.Name;
            pointOfInterestFromStore.Description = pointOfInterestToPatch.Description;

            //return the updated data
            return CreatedAtRoute("GetPointOfInterest",
                new { cityId = cityId, id = id }, pointOfInterestFromStore);
        }

        [HttpDelete("{cityId}/pointsofinterest/{id}")]
        public IActionResult DeletePointOfInterest(int cityId, int id)
        {
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(f => f.Id == cityId);

            if (city == null)
            {
                return NotFound();
            }

            var pointOfInterestFromStore = city.PointsOfInterest.FirstOrDefault(f => f.Id == id);

            if (pointOfInterestFromStore == null)
            {
                return NotFound();
            }

            city.PointsOfInterest.Remove(pointOfInterestFromStore);

            _mailService.Send("Point of interest deleted.",
                $"Point of interest {pointOfInterestFromStore.Name} with id {pointOfInterestFromStore.Id} was deleted.");

            return NoContent();
        }
    }
}
