namespace ArticleAssignment.DataModels
{
    public class Tag : DataModel
    {
        public string Title { get; set; }
        public long ArticleId { get; set; }
        public string Description { get; set; }      
    }
}
