
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ImageSharp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using trunk.Controllers.Resources;
using trunk.Core;
using trunk.Core.Models;

namespace trunk.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository repository;
        private readonly IHostingEnvironment host;
        private readonly PhotoSettings photoSettings;
        private readonly IUnitOfWork unitOfWork;

        public PhotosController(IMapper mapper, IVehicleRepository vehicleRepository, IHostingEnvironment host, IUnitOfWork unitOfWork, IOptionsSnapshot<PhotoSettings> options)
        {
            this.photoSettings = options.Value;
            this.unitOfWork = unitOfWork;
            this.host = host;
            this.repository = vehicleRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Max file size exceeded");
            if (!photoSettings.IsSuported(file.FileName)) return BadRequest("Invalid file type");

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");

            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            TransformToThumbnail(filePath);

            var photo = new Photo { FileName = fileName };

            vehicle.Photos.Add(photo);

            await unitOfWork.CompleteAsync();

            return Ok(mapper.Map<Photo, PhotoResource>(photo));
        }

        private void TransformToThumbnail(string filePath)
        {
            using (Image<Rgba32> image = Image.Load(filePath))
            {
                image
                    .Resize(image.Width / 2, image.Height / 2)
                    .Grayscale();
                image.Save(filePath);
            }
        }
    }
}