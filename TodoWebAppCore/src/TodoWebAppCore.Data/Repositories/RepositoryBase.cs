using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace TodoWebAppCore.Data.Repositories
{
    internal class RepositoryBase
    {
        private const string CONNECTIONSTRING_KEY = "ConnectionString";

        protected SqlConnection connection;

        public RepositoryBase(IConfigurationRoot configuration)
        {
            var cnn = configuration.GetSection(CONNECTIONSTRING_KEY);
            if (string.IsNullOrWhiteSpace(cnn.Value))
                throw new ArgumentException("Connection string not found.");
            connection = new SqlConnection(cnn.Value);
        }
    }
}
