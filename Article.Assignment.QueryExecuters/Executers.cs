using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace Article.Assignment.QueryExecuters
{
    public class Executers : IExecuters
    {
        public void ExecuteCommand(string connStr, Action<SqlConnection> task)
        {
            using (var conn = new SqlConnection(connStr))
            {
                conn.Open();
                task(conn);
            }
        }

        public T ExecuteCommand<T>(string connStr, Func<SqlConnection, T> task)
        {
            using (var conn = new SqlConnection(connStr))
            {
                conn.Open();
                return task(conn);
            }
        }

    }
}
