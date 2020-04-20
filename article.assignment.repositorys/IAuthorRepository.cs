using System;
using System.Collections.Generic;
using System.Text;
using Article.Assignment.DataModels;

namespace Article.Assignment.Repositories
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
