using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public interface ITagRepository : IRepository<Tag>
    {
        public Tag Create(Tag tag);
        public Tag Update(Tag tag);
        public IEnumerable<Tag> Search(SearchTagInput input);
        public Tag Find(Tag tag);
    }
}
