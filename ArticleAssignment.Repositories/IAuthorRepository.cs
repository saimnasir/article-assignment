using System.Collections.Generic;
using ArticleAssignment.DataModels;

namespace ArticleAssignment.Repositories
{
    public interface IAuthorRepository
    {
        Author Read(long id);
        Author Create(Author Author);
        Author Update(Author Author);
        bool Delete(long id);
        List<Author> ListAll();
    }
}
