using System;

namespace ArticleAssignment.ViewModels
{
    public class ViewModel
    {

        private DateTime? _updateDate;

        public long Id { get; set; }
        public DateTime? UpdateDate
        {
            get { return _updateDate ?? CreateDate; }
            set { _updateDate = value; }
        }

        public DateTime CreateDate { get; set; }
    }
}
