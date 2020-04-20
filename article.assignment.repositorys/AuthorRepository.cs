using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Linq;
using Article.Assignment.Queries;
using Article.Assignment.DataModels;
using Article.Assignment.QueryExecuters;

namespace Article.Assignment.Repositories
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly IConfiguration _configuration;
        private readonly ICommandText _commandText;
        private readonly IExecuters _executers;
        private readonly string _connStr;

        public AuthorRepository(IConfiguration configuration, ICommandText commandText, IExecuters executers)
        {
            _commandText = commandText;
            _configuration = configuration;

            _connStr = _configuration.GetConnectionString("ArticleAssignmentDbConnection");
            _executers = executers;
        }

        public Author Read(long id)
        {
            return _executers.ExecuteCommand(_connStr,
                conn => conn.Query<Author>(
                    _commandText.ReadAuthorCommand,
                    new
                    {
                        @Id = id,
                        @Deleted = false
                    }).SingleOrDefault());
        }

        public Author Create(Author author)
        {
            author.Deleted = false;
            var id = _executers.ExecuteCommand(_connStr,
                conn =>
                {
                    var query = conn.Query<long>(
                        _commandText.CreateAuthorCommand,
                        new
                        {
                            author.Name,
                            author.Surname,
                            author.Phone,
                            author.Email,
                            author.BirthDate,
                            author.Deleted
                        }).SingleOrDefault();
                    return query;
                });

            return Read(id);
        }

        public Author Update(Author author)
        {
            _executers.ExecuteCommand(_connStr,
                conn =>
                {
                    var query = conn.Query<Author>(_commandText.UpdateAuthorCommand,
                        new
                        {
                            author.Id,
                            author.Name,
                            author.Surname,
                            author.Phone,
                            author.Email,
                            author.BirthDate,
                            author.Deleted
                        });
                });

            return Read(author.Id);
        }

        public bool Delete(long id)
        {
            if (Read(id) == null)
            {
                return false;
            }
            _executers.ExecuteCommand(_connStr,
                conn =>
                {
                    var query = conn.Query<Author>(_commandText.DeleteAuthorCommand,
                        new
                        {
                            Id = id,
                            @Deleted = true
                        });
                });
            return true;
        }

        public List<Author> ListAll()
        {
            return _executers.ExecuteCommand(_connStr,
                conn => conn.Query<Author>(_commandText.ListAllAuthorsCommand,
                new
                {
                    @Deleted = false
                })).ToList();
        }
    }
}
