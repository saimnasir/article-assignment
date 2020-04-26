using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public interface IArticleTagRepository : IRepository<ArticleTag>
    {
        public ArticleTag Create(ArticleTag comment);
        public ArticleTag Update(ArticleTag comment);
        public IEnumerable<ArticleTag> Search(SearchArticleTagInput input);
    }
}
