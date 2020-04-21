using System;
using System.Collections.Generic;
using System.Text;

namespace ArticleAssignment.Queries
{

    public interface ICommandText
    {
        #region Article 
        string CreateArticleCommand { get; }
        string ReadArticleCommand { get; }
        string UpdateArticleCommand { get; }
        string DeleteArticleCommand { get; }
        string ListAllArticlesCommand { get; }
        string SearchArticlesCommand { get; }
        #endregion

        #region Author
        string CreateAuthorCommand { get; }
        string ReadAuthorCommand { get; }
        string UpdateAuthorCommand { get; }
        string DeleteAuthorCommand { get; }
        string ListAllAuthorsCommand { get; }

        #endregion

    }
}
