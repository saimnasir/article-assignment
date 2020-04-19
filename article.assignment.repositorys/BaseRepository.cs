﻿using Article.Assignment.Queries;
using Article.Assignment.QueryExecuters;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Article.Assignment.Repositories
{
    public class BaseRepository : IBaseRepository
    {
        private readonly IConfiguration _configuration;
        private readonly ICommandText _commandText;
        private readonly string _connStr;
        private readonly IExecuters _executers;
        public BaseRepository(IConfiguration configuration, ICommandText commandText, IExecuters executers)
        {
            _commandText = commandText;
            _configuration = configuration;

            _connStr = _configuration.GetConnectionString("Dapper");
            _executers = executers;
        }
    }
}
