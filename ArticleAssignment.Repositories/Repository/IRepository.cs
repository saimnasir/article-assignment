using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public interface IRepository<T> where T : DataModel
    {
        public T Create(T dataModel, object parameters);
     
        public T Read(long id);
      
        public T Update(T dataModel, object parameters);
      
        public EntityStates Delete(long id);
        
        IEnumerable<T> ListAll();
        
        public IEnumerable<T> Search(object parameters);

        public T Find(object parameters);

    }
}
