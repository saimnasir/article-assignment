using System;
using System.Collections.Generic;
using Article.Assignment.Queries;
using Article.Assignment.QueryExecuters;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Linq;

namespace Article.Assignment.Repositories
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly IConfiguration _configuration;
        private readonly ICommandText _commandText;
        private readonly IExecuters _executers;
        private readonly string _connStr;

        public ArticleRepository(IConfiguration configuration, ICommandText commandText, IExecuters executers)
        {
            _commandText = commandText;
            _configuration = configuration;

            _connStr = _configuration.GetConnectionString("ArticleAssignmentDbConnection");
            _executers = executers;
        }

        public DataModels.Article Read(long id)
        {
            return _executers.ExecuteCommand(_connStr, conn => conn.Query<DataModels.Article>(_commandText.ReadArticleCommand, new { @Id = id }).SingleOrDefault());
        }

        public DataModels.Article Create(DataModels.Article article)
        {
            article.CreateDate = DateTime.Now;
            article.UpdateDate = null;
            article.Deleted = false;

            var id = _executers.ExecuteCommand(_connStr, conn =>
            {
                var query = conn.Query<long>(
                    _commandText.CreateArticleCommand,
                    new
                    {
                        article.Title,
                        article.Author,
                        article.Content,
                        article.CreateDate,
                        article.UpdateDate,
                        article.Deleted
                    }).SingleOrDefault();
                return query;
            });

            return Read(id);
        }

        public DataModels.Article Update(DataModels.Article article)
        {
            var currentArticle = Read(article.Id);
            if (currentArticle == null)
            {
                return null;
            }
            article.UpdateDate = DateTime.Now;

            _executers.ExecuteCommand(_connStr, conn =>
            {
                var query = conn.Query<DataModels.Article>(
                    _commandText.UpdateArticleCommand,
                    new
                    {
                        article.Id,
                        article.Title,
                        article.Author,
                        article.Content,
                        currentArticle.CreateDate, // create date will update 
                        article.UpdateDate
                    });
            });

            return Read(article.Id);
        }

        public void Delete(long id)
        {
            _executers.ExecuteCommand(_connStr,
                conn =>
                {
                    var query = conn.Query<DataModels.Article>(
                        _commandText.DeleteArticleCommand,
                        new
                        {
                            Id = id,
                            Deleted = true
                        });
                });
        }

        public List<DataModels.Article> ListAll()
        {
            return _executers.ExecuteCommand(_connStr, conn => conn.Query<DataModels.Article>(_commandText.ListAllArticlesCommand)).ToList();
        }

        public List<DataModels.Article> Search(long? author, DateTime? createDate, string title)
        {
            var articles = _executers.ExecuteCommand(_connStr, conn => conn.Query<DataModels.Article>(_commandText.SearchArticlesCommand))
                    .Where(a => author.HasValue && a.Author == author.Value)
                    .Where(a => createDate.HasValue && a.CreateDate == createDate.Value)
                    .Where(a => string.IsNullOrEmpty(title) && a.Title.Contains(title))
                    .ToList();
            return articles;
        }

    }
}
