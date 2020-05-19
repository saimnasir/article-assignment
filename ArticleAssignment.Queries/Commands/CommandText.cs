namespace ArticleAssignment.Queries
{
    public class CommandText : ICommandText
    {
        public string CurrentTableName { get; set; }        
       
        public string CreateCommand => $"INS_{CurrentTableName}_SP";

        public string ReadCommmand => $"SEL_{CurrentTableName}_SP";

        public string UpdateCommand => $"UPD_{CurrentTableName}_SP";

        public string DeleteCommand => $"DEL_{CurrentTableName}_SP";

        public string ListAllCommand => $"LST_{CurrentTableName}_SP";

        public string SearchCommand => $"SRC_{CurrentTableName}_SP";

        public string FindCommand => $"FND_{CurrentTableName}_SP";

    }
}
