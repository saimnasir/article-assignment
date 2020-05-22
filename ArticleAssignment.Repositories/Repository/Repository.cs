using ArticleAssignment.Core;
using ArticleAssignment.DataModels;
using ArticleAssignment.Queries;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;

namespace ArticleAssignment.Repositories
{
    public abstract class Repository<T> : IRepository<T> where T : DataModel
    {
        private readonly IConfiguration _configuration;
        private readonly ICommandText _commandText;
        private readonly string _connStr;
        private readonly IExecuters _executers;
        private readonly string _tableName;

        public Repository(IConfiguration configuration, ICommandText commandText, IExecuters executers, string tableName)
        {
            _commandText = commandText;
            _executers = executers;
            _tableName = tableName;
            setCurrentTable();
            _configuration = configuration;
            _connStr = getConnectionString();
        }

        public T Create(T dataModel, object parameters)
        {
            setCurrentTable();

            dataModel.Id = _executers.ExecuteCommand(
                _connStr,
                conn =>
                {
                    return conn.ExecuteScalar<long>(
                        _commandText.CreateCommand,
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );
                });

            return Read(dataModel.Id);
        }

        public T Read(long id)
        {
            setCurrentTable();

            var parameters = new
            {
                @Id = id
            };

            return _executers.ExecuteCommand(
                _connStr,
                conn => conn.QueryFirstOrDefault<T>(
                    _commandText.ReadCommmand,
                    parameters,
                    commandType: CommandType.StoredProcedure
                ));
        }

        public T Update(T dataModel, object parameters)
        {
            setCurrentTable();

            dataModel = _executers.ExecuteCommand(
                _connStr,
                conn =>
                {
                    return conn.QueryFirstOrDefault<T>(
                        _commandText.UpdateCommand,
                        parameters,
                        commandType: CommandType.StoredProcedure
                    );
                });

            return dataModel;
        }

        public EntityStates Delete(long id)
        {
            setCurrentTable();

            var parameters = new
            {
                Id = id
            };

            return _executers.ExecuteCommand(
                 _connStr,
                 conn =>
                 {
                     return conn.ExecuteScalar<EntityStates>(
                         _commandText.DeleteCommand,
                         parameters,
                         commandType: CommandType.StoredProcedure
                     );
                 });
        }

        public IEnumerable<T> ListAll()
        {
            setCurrentTable();

            var items = _executers.ExecuteCommand(
                           _connStr,
                           conn => conn.Query<T>(
                               _commandText.ListAllCommand,
                               commandType: CommandType.StoredProcedure
                           ));

            return items;
        }

        public IEnumerable<T> Search(object parameters)
        {
            setCurrentTable();

            var items = _executers.ExecuteCommand(
                           _connStr,
                           conn => conn.Query<T>(
                               _commandText.SearchCommand,
                               parameters,
                               commandType: CommandType.StoredProcedure
                           ));

            return items;
        }
        public T Find(T dataModel, object parameters)
        {
            setCurrentTable();

            return _executers.ExecuteCommand(
                _connStr,
                conn => conn.QueryFirstOrDefault<T>(
                    _commandText.FindCommand,
                    parameters,
                    commandType: CommandType.StoredProcedure
                ));
        }

        private string getConnectionString()
        {
            return _configuration.GetConnectionString("ArticleAssignmentDbConnection");
        }

        private void setCurrentTable()
        {
            _commandText.CurrentTableName = _tableName;
        }


    }
}
