using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public interface ICommentRepository : IRepository<Comment>
    {
        public Comment Create(Comment comment);
        public Comment Update(Comment comment);
        public IEnumerable<Comment> Search(SearchCommentInput input);
    }
}
