namespace trunk.Core.Models
{
    public class VehicleQuery
    {
        public int? MakeId { get; set; }
        public int? ModelId { get; internal set; }
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
    }
}