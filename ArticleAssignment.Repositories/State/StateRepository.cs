using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using ArticleAssignment.Queries;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public class StateRepository : Repository<State>, IStateRepository
    {
        public StateRepository(IConfiguration configuration, ICommandText commandText, IExecuters executers, string tableName)
            : base(configuration, commandText, executers, tableName)
        {
        }

        public State Create(State state)
        {
            var parameters = new
            {
                state.Name,
                state.Description,
                EntityState = EntityStates.Createted
            };
            return base.Create(state, parameters);
        }

        public State Update(State state)
        {
            var parameters = new
            {
                state.Id,
                state.Name,
                state.Description,
                EntityState = EntityStates.Updated
            };
            return base.Update(state, parameters);
        }

        public IEnumerable<State> Search(SearchInputBase input)
        {
            var parameters = new
            {
                CreateDateStart = input.CreateDateInterval?.Start,
                CreateDateEnd = input.CreateDateInterval?.End,
                UpdateDateStart = input.UpdateDateInterval?.Start,
                UpdateDateEnd = input.UpdateDateInterval?.End,
                QueryText = input.QueryText
            };
            return base.Search(parameters);
        }
    }
}
