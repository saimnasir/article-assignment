using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Linq;
using ArticleAssignment.Queries;
using ArticleAssignment.DataModels;
using ArticleAssignment.QueryExecuters;
using System.Data;

namespace ArticleAssignment.Repositories
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly IConfiguration _configuration;
        private readonly ICommandText _commandText;
        private readonly IExecuters _executers;
        private readonly string _connStr;

        public AuthorRepository(
            IConfiguration configuration,
            ICommandText commandText,
            IExecuters executers)
        {
            _commandText = commandText;
            _configuration = configuration;
            _connStr = _configuration.GetConnectionString("ArticleAssignmentDbConnection");
            _executers = executers;
        }

        public Author Read(long id)
        {
            var parameters = new
            {
                @Id = id
            };

            return _executers.ExecuteCommand(_connStr,
                conn => conn.QueryFirstOrDefault<Author>(
                    _commandText.ReadAuthorCommand,
                    parameters,
                    commandType: CommandType.StoredProcedure
                ));
        }

        public Author Create(Author author)
        {
            var parameters = new
            {
                author.Name,
                author.Surname,
                author.Phone,
                author.Email,
                author.BirthDate
            };

            var id = _executers.ExecuteCommand(
                _connStr,
                conn =>
                {
                    return conn.ExecuteScalar<long>(
                        _commandText.CreateAuthorCommand,
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );
                });

            return Read(id);
        }

        public Author Update(Author author)
        {
            var parameters = new
            {
                author.Id,
                author.Name,
                author.Surname,
                author.BirthDate,
                author.Phone,
                author.Email
            };

            author = _executers.ExecuteCommand(
                _connStr,
                conn =>
                {
                    return conn.QueryFirstOrDefault<Author>(
                        _commandText.UpdateAuthorCommand,
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );
                });

            return author;
        }

        public bool Delete(long id)
        {
            var parameters = new
            {
                Id = id
            };

            var isDeleted = _executers.ExecuteCommand(
                _connStr,
                 conn =>
                 {
                     return conn.ExecuteScalar<bool>(
                         _commandText.DeleteAuthorCommand,
                         parameters,
                         commandType: CommandType.StoredProcedure
                     );
                 });

            return isDeleted;
        }

        public List<Author> ListAll()
        {
            return _executers.ExecuteCommand(
                _connStr,
                conn => conn.Query<Author>(
                    _commandText.ListAllAuthorsCommand,
                    commandType: CommandType.StoredProcedure
                )).ToList();
        }
    }
}
