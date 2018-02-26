using System.Collections.Generic;
using System.Collections.ObjectModel;
using trunk.Core.Models;

namespace trunk.Controllers.Resources
{
    public class MakeResource
    {
        //public ICollection<Feature> Features { get; set; }
        public int Id { get; set; }
        
        public string Name { get; set; }

        public ICollection<ModelResource> Models { get; set; }

        public MakeResource() => Models = new Collection<ModelResource>();
    }
}