using System.ComponentModel.DataAnnotations.Schema;

namespace trunk.Core.Models
{
    [Table("VehicleFeatures")]
    public class VehicleFeature
    {
        public int VechileId { get; set; }
        public int FeatureId { get; set; }
        public Vehicle Vechile { get; set; }
        public Feature Feature { get; set; }
    }
}