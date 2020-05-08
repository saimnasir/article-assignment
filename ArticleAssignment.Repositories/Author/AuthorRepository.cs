using Microsoft.Extensions.Configuration;
using ArticleAssignment.Queries;
using ArticleAssignment.DataModels;
using ArticleAssignment.Core;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public class AuthorRepository : Repository<Author>, IAuthorRepository
    {
        public AuthorRepository(IConfiguration configuration, ICommandText commandText, IExecuters executers, string tableName)
          : base(configuration, commandText, executers,  tableName)
        {
        }

        public Author Create(Author author)
        {
            var parameters = new
            {
                author.FirstName,
                author.MiddleName,
                author.LastName,
                author.BirthDate,
                author.Email,
                author.Phone,
                author.About,
                EntityState = EntityStates.Createted
            };
            return base.Create(author, parameters);
        }
      
        public Author Update(Author author)
        {
            var parameters = new
            {
                author.Id,
                author.FirstName,
                author.MiddleName,
                author.LastName,
                author.BirthDate,
                author.Email,
                author.Phone,
                author.About,
                EntityState = EntityStates.Updated
            };
            return base.Update(author, parameters);
        }

        public IEnumerable<Author> Search(SearchAuthorInput input)
        {
            var parameters = new
            {
                CreateDateStart = input.CreateDateInterval?.Start,
                CreateDateEnd = input.CreateDateInterval?.End,
                UpdateDateStart = input.UpdateDateInterval?.Start,
                UpdateDateEnd = input.UpdateDateInterval?.End,
                QueryText = input.QueryText
            };
            return base.Search(parameters);
        }

    }
}
