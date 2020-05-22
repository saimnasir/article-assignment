using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public interface IArticleTagRepository : IRepository<ArticleTag>
    {
        public ArticleTag Create(ArticleTag articleTag);
        public ArticleTag Update(ArticleTag articleTag);
        public IEnumerable<ArticleTag> Search(SearchArticleTagInput input);
    }
}
