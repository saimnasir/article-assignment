namespace ArticleAssignment.Core
{
    public class SearchArticleInput : SearchInputBase
    {
        public long? AuthorId { get; set; }
        public long? State { get; set; }
    }

}
