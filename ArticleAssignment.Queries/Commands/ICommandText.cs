namespace ArticleAssignment.Queries
{

    public interface ICommandText
    {
        public string CurrentTableName { get; set; }
        public string CreateCommand { get; }
        public string ReadCommmand { get; }
        public string UpdateCommand { get; }
        public string DeleteCommand { get; }
        public string ListAllCommand { get; }
        public string SearchCommand { get; }
        public string FindCommand { get; }


    }
}
