namespace ArticleAssignment.ViewModels
{
    public class Comment : ViewModel
    {
        public string Content { get; set; }
        public long AuthorId { get; set; }
        public long ArticleId { get; set; }
    }
}
