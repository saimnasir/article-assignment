using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public interface IArticleCommentRepository : IRepository<ArticleComment>
    {
        public ArticleComment Create(ArticleComment comment);
        public ArticleComment Update(ArticleComment comment);
        public IEnumerable<ArticleComment> Search(SearchArticleCommentInput input);
    }
}
