using Article.Assignment.DataModels.Dto;
using System;
using System.Collections.Generic;

namespace Article.Assignment.Repositories
{
    public interface IArticleRepository
    {
        DataModels.Article Read(long id);
        DataModels.Article Create(DataModels.Article article);
        DataModels.Article Update(DataModels.Article article);
        void Delete(long id);
        List<DataModels.Article> ListAll();
        List<DataModels.Article> Search(SearchArticleInput input);
    }
}
