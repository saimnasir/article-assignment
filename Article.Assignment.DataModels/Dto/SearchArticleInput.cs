using System;
using System.Collections.Generic;
using System.Text;

namespace Article.Assignment.DataModels.Dto
{
    public class SearchArticleInput
    {
        public long? Author { get; set; }
        public DateInterval CreateDateInterval { get; set; }
        public DateInterval UpdateDateInterval { get; set; }
        public string Title { get; set; }
    }
    public class DateInterval
    {
        public DateTime? Start { get; set; }
        public DateTime? End { get; set; }
    }
}
