using CityInfo.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CityInfo.API
{
    public class CitiesDataStore
    {
        public static CitiesDataStore Current { get; } = new CitiesDataStore();

        public List<CityDto> Cities { get; set; }

        public CitiesDataStore()
        {
            Cities = new List<CityDto>() {
            new CityDto()
            {
                Id = 1,
                Name = "Belo Horizonte",
                Description = "Cheese bread city",
                PointsOfInterest = new List<PointOfInterestDto>()
                {
                    new PointOfInterestDto(){
                        Id = 1,
                        Name = "Parque municipal",
                        Description = "Parque bem cuidado",
                    },
                    new PointOfInterestDto(){
                        Id = 2,
                        Name = "Feira hippie",
                        Description = "Feira com muitas coisas para comprar",
                    }
                },

            },
            new CityDto()
            {
                Id = 2,
                Name = "Timóteo",
                Description = "Hot city",
                PointsOfInterest = new List<PointOfInterestDto>()
                {
                    new PointOfInterestDto(){
                        Id = 1,
                        Name = "Morro Eldorado",
                        Description = "Vista bonita",
                    }
                }
            },
            new CityDto()
            {
                Id = 3,
                Name = "Ipatinga",
                Description = "So hot city",
                PointsOfInterest = new List<PointOfInterestDto>()
                {
                    new PointOfInterestDto(){
                        Id = 1,
                        Name = "Lagoa bonita",
                        Description = "Lugar para relaxar muito",
                    }
                }
            },

            };
        }
    }
}
