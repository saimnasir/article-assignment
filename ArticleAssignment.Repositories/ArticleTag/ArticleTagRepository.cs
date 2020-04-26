using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using ArticleAssignment.Queries;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public class ArticleTagRepository : Repository<ArticleTag>, IArticleTagRepository
    {
        public ArticleTagRepository(IConfiguration configuration, ICommandText commandText, IExecuters executers, string tableName)
            : base(configuration, commandText, executers, tableName)
        {
        }

        public ArticleTag Create(ArticleTag comment)
        {
            var parameters = new
            {
                comment.ArticleId,
                comment.TagId,
                EntityState = EntityStates.Createted
            };
            return base.Create(comment, parameters);
        }

        public ArticleTag Update(ArticleTag comment)
        {
            var parameters = new
            {
                comment.Id,
                EntityState = EntityStates.Updated
            };
            return base.Update(comment, parameters);
        }


        public IEnumerable<ArticleTag> Search(SearchArticleTagInput input)
        {
            var parameters = new
            {
                CreateDateStart = input.CreateDateInterval?.Start,
                CreateDateEnd = input.CreateDateInterval?.End,
                UpdateDateStart = input.UpdateDateInterval?.Start,
                UpdateDateEnd = input.UpdateDateInterval?.End,
                input.TagId,
                input.ArticleId
            };
            return base.Search(parameters);
        }
    }
}
