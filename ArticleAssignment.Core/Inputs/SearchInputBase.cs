namespace ArticleAssignment.Core
{
    public class SearchInputBase
    {
        public long? Id { get; set; }
        public long? MasterId { get; set; }
        public string QueryText { get; set; } 
        public DateInterval CreateDateInterval { get; set; }
        public DateInterval UpdateDateInterval { get; set; }         
        public long? LeftMasterId { get; set; }
        public long? RightMasterId { get; set; }
    }
}
