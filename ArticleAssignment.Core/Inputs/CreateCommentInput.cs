namespace ArticleAssignment.Core
{
    public class CreateCommentInput 
    {
        public string Content { get; set; }
        public long AuthorId { get; set; }
        public long ArticleId { get; set; }
    }

}
