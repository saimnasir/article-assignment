using ArticleAssignment.Core.Enums;

namespace ArticleAssignment.DataModels
{
    public class Article : DataModel
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public long AuthorId { get; set; }

        public long CategoryId { get; set; }

        public States State { get; set; }
    }
}
