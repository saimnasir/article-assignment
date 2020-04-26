using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using ArticleAssignment.Queries;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration, ICommandText commandText, IExecuters executers, string tableName)
            : base(configuration, commandText, executers,  tableName)
        {
        }

        public Comment Create(Comment comment)
        {
            var parameters = new
            {
                comment.Content,
                comment.AuthorId,
                EntityState = EntityStates.Createted
            };
            return base.Create(comment, parameters);
        }

        public Comment Update(Comment comment)
        {
            var parameters = new
            {
                comment.Id,
                comment.Content,
                // comment.AuthorId,
                EntityState = EntityStates.Updated
            };
            return base.Update(comment, parameters);
        }


        public IEnumerable<Comment> Search(SearchCommentInput input)
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
