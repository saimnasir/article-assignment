using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using ArticleAssignment.Queries;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration, ICommandText commandText, IExecuters executers, string tableName)
            : base(configuration, commandText, executers, tableName)
        {
        }

        public Category Create(Category tag)
        {
            var parameters = new
            {
                tag.Header,
                tag.Description,
                EntityState = EntityStates.Createted
            };
            return base.Create(tag, parameters);
        }

        public Category Update(Category tag)
        {
            var parameters = new
            {
                tag.Id,
                tag.Header,
                tag.Description,
                EntityState = EntityStates.Updated
            };
            return base.Update(tag, parameters);
        }

        public IEnumerable<Category> Search(SearchInputBase input)
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
