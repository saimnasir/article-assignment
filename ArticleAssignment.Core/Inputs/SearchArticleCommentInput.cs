namespace ArticleAssignment.Core
{
    public class SearchArticleCommentInput : SearchInputBase
    {
        public long? ArticleId { get; set; }
        public long? CommentId { get; set; }
    }

}
