using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace trunk.Core.Models
{
    public class Make
    {
        public Make()
        {
            Models = new Collection<Model>();
        }
        //public ICollection<Feature> Features { get; set; }
        public int Id { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public ICollection<Model> Models { get; set; }
    }
}