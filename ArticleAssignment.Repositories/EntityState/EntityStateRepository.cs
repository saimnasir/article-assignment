using ArticleAssignment.DataModels;
using ArticleAssignment.Queries;
using Microsoft.Extensions.Configuration;

namespace ArticleAssignment.Repositories
{
    public class EntityStateRepository : Repository<EntityState>, IEntityStateRepository
    {
        public EntityStateRepository(IConfiguration configuration, ICommandText commandText, IExecuters executers, string tableName)
            : base(configuration, commandText, executers, tableName)
        {
        } 
    }
}
