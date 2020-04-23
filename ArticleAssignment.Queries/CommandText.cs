namespace ArticleAssignment.Queries
{
    public class CommandText : ICommandText
    {
        #region Article 
        public string CreateArticleCommand => "INS_ARTICLE_SP";
        public string ReadArticleCommand => "SEL_ARTICLE_SP";
        public string UpdateArticleCommand => "UPD_ARTICLE_SP";
        public string DeleteArticleCommand => "DEL_ARTICLE_SP";
        public string ListAllArticlesCommand => "LST_ARTICLE_SP";
        public string SearchArticlesCommand => "LST_SEARCHARTICLE_SP";
        #endregion

        #region Author 
        public string CreateAuthorCommand => "INS_AUTHOR_SP";
        public string ReadAuthorCommand => "SEL_AUTHOR_SP";
        public string UpdateAuthorCommand => "UPD_AUTHOR_SP";
        public string DeleteAuthorCommand => "DEL_AUTHOR_SP";
        public string ListAllAuthorsCommand => "LST_AUTHOR_SP";
        #endregion
    }
}
