using Microsoft.Data.SqlClient;
using System;

namespace ArticleAssignment.QueryExecuters
{

    public interface IExecuters
    {
        void ExecuteCommand(string connStr, Action<SqlConnection> task);
        T ExecuteCommand<T>(string connStr, Func<SqlConnection, T> task);

    }
}
