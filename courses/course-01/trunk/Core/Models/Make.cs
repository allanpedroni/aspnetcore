using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace trunk.Core.Models
{
    public class Make : Model
    {
        public Make()
        {
            Models = new Collection<Model>();
        }
        //public ICollection<Feature> Features { get; set; }

        public ICollection<Model> Models { get; set; }
    }
}