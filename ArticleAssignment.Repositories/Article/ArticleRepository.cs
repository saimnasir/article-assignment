﻿using ArticleAssignment.Queries;
using Microsoft.Extensions.Configuration;
using ArticleAssignment.DataModels;
using ArticleAssignment.Core;
using System.Collections.Generic;
using ArticleAssignment.Core.Enums;

namespace ArticleAssignment.Repositories
{
    public class ArticleRepository : Repository<Article>, IArticleRepository
    {
        public ArticleRepository(IConfiguration configuration, ICommandText commandText, IExecuters executers, string tableName)
             : base(configuration, commandText, executers, tableName)
        {
            
        }
      
        public Article Create(Article article)
        {
            var parameters = new
            {
                article.Title,
                article.Content,
                article.AuthorId,
                article.CategoryId,
                State = States.Waiting,
                EntityState = EntityStates.Createted
            };
            return base.Create(article, parameters);
        }

        public Article Update(Article article)
        {
            var parameters = new
            {
                article.Id,
                article.Title,
                article.Content,
                article.AuthorId,
                article.CategoryId,
                article.State,
                EntityState = EntityStates.Updated
            };
            return base.Update(article, parameters);
        }

        public IEnumerable<Article> Search(SearchArticleInput input)
        {
            var parameters = new
            {
                CreateDateStart = input.CreateDateInterval?.Start,
                CreateDateEnd = input.CreateDateInterval?.End,
                UpdateDateStart = input.UpdateDateInterval?.Start,
                UpdateDateEnd = input.UpdateDateInterval?.End,
                input.QueryText,
                input.AuthorId,
                input.State
            };
            return base.Search(parameters);
        }       
    }
}
