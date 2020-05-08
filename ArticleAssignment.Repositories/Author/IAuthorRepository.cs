using System.Collections.Generic;
using ArticleAssignment.Core;
using ArticleAssignment.DataModels;

namespace ArticleAssignment.Repositories
{
    public interface IAuthorRepository : IRepository<Author>
    {
        public Author Create(Author tag);
        public Author Update(Author tag);
        
        public IEnumerable<Author> Search(SearchAuthorInput input);
    }
}
