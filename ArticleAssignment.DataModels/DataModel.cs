using ArticleAssignment.Core;
using System;

namespace ArticleAssignment.DataModels
{
    public class DataModel
    {
        private DateTime? _updateDate;


        public long Id { get; set; }
        public DateTime CreateDate { get; set; }

        public DateTime? UpdateDate
        {
            get { return _updateDate ?? CreateDate; }
            set { _updateDate = value; }
        }

        public EntityStates EntityState { get; set; }

    }
}
