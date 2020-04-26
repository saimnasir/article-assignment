using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public interface IStateRepository : IRepository<State>
    {
        public State Create(State state);
        public State Update(State state);
        public IEnumerable<State> Search(SearchInputBase input);
    }
}
