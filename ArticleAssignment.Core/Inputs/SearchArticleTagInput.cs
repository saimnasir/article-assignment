namespace ArticleAssignment.Core
{
    public class SearchArticleTagInput : SearchInputBase
    {
        public long? ArticleId { get; set; }
        public long? TagId { get; set; }
    }

}
