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

            var article = _executers.ExecuteCommand(
                _connStr,
                conn => conn.QueryFirstOrDefault<Article>(
                    _commandText.ReadArticleCommand,
                    parameters,
                    commandType: CommandType.StoredProcedure
                ));

            fillAuthorInformationsForSingle(article);
            return article;
        }

        public Article Create(Article article)
        {
            var parameters = new
            {
                article.Title,
                article.Author,
                article.Content
            };

            article.Id = _executers.ExecuteCommand(
                _connStr,
                conn =>
                {
                    return conn.ExecuteScalar<long>(
                        _commandText.CreateArticleCommand,
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );
                });

            return Read(article.Id);
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

            fillAuthorInformationsForSingle(article);
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
            var articles = _executers.ExecuteCommand(
                _connStr,
                conn => conn.Query<Article>(
                    _commandText.ListAllArticlesCommand,
                   commandType: CommandType.StoredProcedure
                )).ToList();

            fillAuthorInformationsForAll(articles);
            return articles;
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

            var articles = _executers.ExecuteCommand(_connStr,
                 conn => conn.Query<Article>(
                     _commandText.SearchArticlesCommand,
                     parameters,
                     commandType: CommandType.StoredProcedure
                 )).ToList();

            fillAuthorInformationsForAll(articles);
            return articles;
        }

        private void fillAuthorInformationsForAll(List<Article> articles)
        {
            if (articles.Any())
            {
                var authors = listAuthorsOfArticles(articles);
                if (authors.Any())
                {
                    articles.ForEach(article =>
                    {
                        var author = authors.FirstOrDefault(a => a.Id == article.Author);
                        fillAuthorInformationsForSingle(article, author);
                    });
                }
            }
        }

        private List<Author> listAuthorsOfArticles(List<Article> articles)
        {
            var authors = _executers.ExecuteCommand(_connStr,
                conn => conn.Query<Author>(
                    _commandText.ListAllAuthorsCommand,
                    commandType: CommandType.StoredProcedure
                ).Where(author => articles.Any(article => article.Author == author.Id))
                .ToList());

            return authors;
        }

        private void fillAuthorInformationsForSingle(Article article, Author author = null)
        {
            if (article != null)
            {
                if (author == null)
                {
                    author = readAuthor(article.Author);
                }
                if (author != null)
                {
                    article.AuthorName = author.Name;
                    article.AuthorSurname = author.Surname;
                }
            };
        }

        private Author readAuthor(long authorId)
        {
            var parameters = new
            {
                @Id = authorId
            };
            var author= _executers.ExecuteCommand(_connStr,
                conn => conn.QueryFirstOrDefault<Author>(
                    _commandText.ReadAuthorCommand,
                    parameters,
                    commandType: CommandType.StoredProcedure
                ));

            return author;
        }

    }
}
