namespace ArticleAssignment.Core
{
    public class SearchInputBase
    {
        public DateInterval CreateDateInterval { get; set; }
        public DateInterval UpdateDateInterval { get; set; }
        public string QueryText { get; set; } 
    }
}
