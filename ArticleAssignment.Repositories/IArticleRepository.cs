﻿using ArticleAssignment.DataModels.Dto;
using System.Collections.Generic;

namespace ArticleAssignment.Repositories
{
    public interface IArticleRepository
    {
        DataModels.Article Read(long id);
        DataModels.Article Create(DataModels.Article article);
        DataModels.Article Update(DataModels.Article article);
        bool Delete(long id);
        List<DataModels.Article> ListAll();
        List<DataModels.Article> Search(SearchArticleInput input);
    }
}
