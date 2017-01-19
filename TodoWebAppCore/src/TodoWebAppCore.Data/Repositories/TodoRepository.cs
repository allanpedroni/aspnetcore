using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoWebAppCore.Domain.Entities;
using TodoWebAppCore.Domain.Filters;
using TodoWebAppCore.Domain.Repositories;
using Microsoft.Extensions.Configuration;
using Dapper;

namespace TodoWebAppCore.Data.Repositories
{
    internal class TodoRepository : RepositoryBase, ITodoRepository
    {
        public TodoRepository(IConfigurationRoot configuration) : base(configuration)
        {
        }

        public Todo Create(Todo todo)
        {
            todo.Id = connection.QueryFirst<int>("exec sp_create @Text, @IsCompleted", todo);
            return todo;
        }

        public bool Delete(int id)
        {
            var count = connection.Execute("exec sp_delete @Id", new { Id = id });
            return count > 0;
        }

        public Todo GetById(int id)
        {
            var retorno = connection.QueryFirstOrDefault<Todo>("exec sp_get @Id", new { Id = id });
            return retorno;
        }

        public IEnumerable<Todo> List(TodoFilter filter)
        {
            var retorno = connection.Query<Todo>("exec sp_list @Id, @Text, @IsComplted", filter);
            return retorno;
        }

        public bool Update(Todo todo)
        {
            var count = connection.Execute("exec sp_update @Id, @Text, @IsCompleted", todo);
            return count > 0;
        }
    }
}
