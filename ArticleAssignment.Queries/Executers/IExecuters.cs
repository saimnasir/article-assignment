using Microsoft.Data.SqlClient;
using System;

namespace ArticleAssignment.Queries
{

    public interface IExecuters
    {
        void ExecuteCommand(string connStr, Action<SqlConnection> task);
        T ExecuteCommand<T>(string connStr, Func<SqlConnection, T> task);
    }
}
