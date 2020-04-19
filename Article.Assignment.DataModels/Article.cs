using System;

namespace Article.Assignment.DataModels
{
    public class Article
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public long Author { get; set; }

        public string Content { get; set; }

        public DateTime CreateDate { get; set; }

        private DateTime? _updateDate;
        public DateTime? UpdateDate
        {
            get { return _updateDate ?? CreateDate; }
            set { _updateDate = value; }
        }

        public bool Deleted { get; set; }
    }
}
