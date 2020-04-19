using System;
using System.Collections.Generic;
using System.Text;

namespace Article.Assignment.Queries
{
    public class CommandText : ICommandText
    {
        #region Article 
        public string CreateArticleCommand =>   
            "INSERT INTO [dbo].[Article] ([Title], [Content], [Author], [CreateDate], [UpdateDate], [Deleted]) OUTPUT Inserted.Id VALUES  (@Title, @Content, @Author, @CreateDate, @UpdateDate, @Deleted);";

        public string ReadArticleCommand =>     
            "SELECT * FROM [dbo].[Article] WHERE Id = @Id AND [Deleted] = 0;";

        public string UpdateArticleCommand =>
            "UPDATE [dbo].[Article] SET [Title] = @Title, [Content] = @Content, [Author] = @Author, [UpdateDate] = @UpdateDate, [Deleted] = @Deleted WHERE Id = @Id;";

        public string DeleteArticleCommand =>   
            "UPDATE [dbo].[Article] SET [Deleted] = @Deleted WHERE Id = @Id;";

        public string ListAllArticlesCommand => 
            "SELECT * FROM [dbo].[Article] WHERE [Deleted] = 0;";

        public string SearchArticlesCommand =>
            "SELECT * FROM [dbo].[Article] WHERE [Deleted] = @Deleted  AND (@Author IS NULL OR [Author] = @Author) AND (@CreateDateStart IS NULL OR CreateDate >= @CreateDateStart) AND (@CreateDateEnd IS NULL OR CreateDate <= @CreateDateEnd) AND (@UpdateDateStart IS NULL OR UpdateDate >= @UpdateDateStart) AND (@CreateDateEnd IS NULL OR CreateDate <= @CreateDateEnd) AND (@Title IS NULL OR Title like  \'%\'+@Title+\'%\');";

        #endregion


        #region Author 
        public string CreateAuthorCommand =>
            "INSERT INTO [dbo].[Author] ([Name], [Surname], [BirthDate], [Email], [Phone], [Deleted])  OUTPUT Inserted.Id VALUES (@Name, @Surname, @BirthDate, @Email, @Phone, @Deleted);";

        public string ReadAuthorCommand =>
            "SELECT * FROM[dbo].[Author] WHERE [Id] = @Id AND [Deleted] = 0;";        

        public string UpdateAuthorCommand =>
            "UPDATE [dbo].[Author] SET [Name] = @Name, [Surname] = @Surname, [BirthDate] = @BirthDate, [Email] = @Email, [Phone] = @Phone, [Deleted] = @Deleted WHERE [Id] = @Id;";

        public string DeleteAuthorCommand =>
             "UPDATE [dbo].[Author] SET [Deleted] = @Deleted WHERE Id = @Id;";

        public string ListAllAuthorsCommand => 
            "SELECT * FROM[dbo].[Author] WHERE [Deleted] = 0;";
        
        #endregion
    }
}
