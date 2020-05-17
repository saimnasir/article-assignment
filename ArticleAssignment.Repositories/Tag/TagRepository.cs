using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using ArticleAssignment.Queries;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace ArticleAssignment.Repositories
{
    public class TagRepository : Repository<Tag>, ITagRepository
    {
        public TagRepository(IConfiguration configuration, ICommandText commandText, IExecuters executers, string tableName)
            : base(configuration, commandText, executers, tableName)
        {
        }

        public Tag Create(Tag tag)
        {
            var parameters = new
            {
                tag.Title,
                tag.Description,
                EntityState = EntityStates.Createted
            };
            return base.Create(tag, parameters);
        }

        public Tag Update(Tag tag)
        {
            var parameters = new
            {
                tag.Id,
                tag.Title,
                tag.Description,
                EntityState = EntityStates.Updated
            };
            return base.Update(tag, parameters);
        }

        public IEnumerable<Tag> Search(SearchTagInput input)
        {
            var parameters = new
            {
                CreateDateStart = input.CreateDateInterval?.Start,
                CreateDateEnd = input.CreateDateInterval?.End,
                UpdateDateStart = input.UpdateDateInterval?.Start,
                UpdateDateEnd = input.UpdateDateInterval?.End,
                input.QueryText,
                input.ArticleId
            };
            return base.Search(parameters);
        }

        public Tag Find(string title)
        {
            var parameters = new
            {
                Title = title
            };
            return base.Find(parameters);
        }
    }
}
