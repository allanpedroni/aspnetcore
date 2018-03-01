using System.Collections.Generic;
using System.Collections.ObjectModel;
using trunk.Core.Models;

namespace trunk.Controllers.Resources
{
    public class MakeResource : KeyValuePairResource
    {
        public ICollection<KeyValuePairResource> Models { get; set; }

        public MakeResource()
        {
            Models = new Collection<KeyValuePairResource>();
        }
    }
}