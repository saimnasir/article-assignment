namespace ArticleAssignment.DataModels
{
    public class Comment : DataModel
    {
        public string Content { get; set; }
        public long AuthorId { get; set; }
    }
}
