using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public interface ICategoryRepository : IRepository<Category>
    {
        public Category Create(Category category);
        public Category Update(Category category);
        public IEnumerable<Category> Search(SearchInputBase input);
    }
}
