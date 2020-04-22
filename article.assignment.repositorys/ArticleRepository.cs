using System;
using System.Collections.Generic;
using ArticleAssignment.Queries;
using ArticleAssignment.QueryExecuters;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Linq;
using ArticleAssignment.DataModels.Dto;
using System.Data;
using ArticleAssignment.DataModels;

namespace ArticleAssignment.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly IConfiguration _configuration;
        private readonly ICommandText _commandText;
        private readonly IExecuters _executers;
        private readonly string _connStr;

        public ArticleRepository(
            IConfiguration configuration,
            ICommandText commandText,
            IExecuters executers)
        {
            _commandText = commandText;
            _configuration = configuration;

            _connStr = _configuration.GetConnectionString("ArticleAssignmentDbConnection");
            _executers = executers;
        }

        public Article Read(long id)
        {
            var parameters = new
            {
                @Id = id
            };

            return _executers.ExecuteCommand(
                _connStr,
                conn => conn.QueryFirstOrDefault<Article>(
                    _commandText.ReadArticleCommand,
                    parameters,
                    commandType: CommandType.StoredProcedure
                ));
        }

        public Article Create(Article article)
        {
            var parameters = new
            {
                article.Title,
                article.Author,
                article.Content
            };

            var result = _executers.ExecuteCommand(
                _connStr,
                conn =>
                {
                    return conn.ExecuteScalar<long>(
                        _commandText.CreateArticleCommand,
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );
                });

            return Read(result);
        }

        public Article Update(Article article)
        {
            var parameters = new
            {
                article.Id,
                article.Title,
                article.Author,
                article.Content
            };

            article = _executers.ExecuteCommand(
                _connStr,
                conn =>
                {
                    return conn.QueryFirstOrDefault<Article>(
                        _commandText.UpdateArticleCommand,
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );
                });

            return article;
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
                        _commandText.DeleteArticleCommand,
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );
                });

            return isDeleted;
        }

        public List<Article> ListAll()
        {
            return _executers.ExecuteCommand(
                _connStr,
                conn => conn.Query<Article>(
                    _commandText.ListAllArticlesCommand,
                   commandType: CommandType.StoredProcedure
                )).ToList();
        }

        public List<Article> Search(SearchArticleInput input)
        {
            var parameters = new
            {
                input.Author,
                CreateDateStart = input.CreateDateInterval?.Start,
                CreateDateEnd = input.CreateDateInterval?.End,
                UpdateDateStart = input.UpdateDateInterval?.Start,
                UpdateDateEnd = input.UpdateDateInterval?.End,
                input.Title
            };

            return _executers.ExecuteCommand(_connStr,
                 conn => conn.Query<Article>(
                     _commandText.SearchArticlesCommand,
                     parameters,
                     commandType: CommandType.StoredProcedure
                 )).ToList();
        }

    }
}
