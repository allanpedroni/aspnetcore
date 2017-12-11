using System.ComponentModel.DataAnnotations;

namespace CityInfo.API.Models
{
    public class PointOfInterestForCreationDto
    {
        [Required(ErrorMessage = "Nome é de preenchimento obrigatório.")]
        [MaxLength(50)]
        public string Name { get; set; }

        [MaxLength(200, ErrorMessage = "Tamanho da descrição é maior que 200 caracteres.")]
        public string Description { get; set; }
    }
}
