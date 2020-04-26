using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using ArticleAssignment.Queries;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public class ArticleCommentRepository : Repository<ArticleComment>, IArticleCommentRepository
    {
        public ArticleCommentRepository(IConfiguration configuration, ICommandText commandText, IExecuters executers, string tableName)
            : base(configuration, commandText, executers, tableName)
        {
        }

        public ArticleComment Create(ArticleComment comment)
        {
            var parameters = new
            {
                comment.ArticleId,
                comment.CommentId,
                EntityState = EntityStates.Createted
            };
            return base.Create(comment, parameters);
        }

        public ArticleComment Update(ArticleComment comment)
        {
            var parameters = new
            {
                comment.Id,
                EntityState = EntityStates.Updated
            };
            return base.Update(comment, parameters);
        }


        public IEnumerable<ArticleComment> Search(SearchArticleCommentInput input)
        {
            var parameters = new
            {
                CreateDateStart = input.CreateDateInterval?.Start,
                CreateDateEnd = input.CreateDateInterval?.End,
                UpdateDateStart = input.UpdateDateInterval?.Start,
                UpdateDateEnd = input.UpdateDateInterval?.End,
                input.QueryText,
                input.ArticleId
            };
            return base.Search(parameters);
        }
    }
}
