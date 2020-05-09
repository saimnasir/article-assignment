using ArticleAssignment.Core;
using System;

namespace ArticleAssignment.DataModels
{
    public class DataModel
    { 
        public long Id { get; set; }
        public DateTime CreateDate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public EntityStates EntityState { get; set; }

    }
}
