using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoWebAppCore.Data.Repositories;
using TodoWebAppCore.Domain.Repositories;

namespace TodoWebAppCore.Data.IoC
{
    public class Module
    {
        public static Dictionary<Type, Type> GetTypes()
        {
            var dic = new Dictionary<Type, Type>();
            dic.Add(typeof(ITodoRepository), typeof(TodoRepository));
            return dic;
        }
    }
}
