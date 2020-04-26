using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public interface IArticleRepository : IRepository<Article>
    {
        public Article Create(Article article);
        public Article Update(Article article);
        public Article Check(long id);
        public Article Approve(long id);
        public Article Reject(long id);
        public IEnumerable<Article> Search(SearchArticleInput input);
    }
}
