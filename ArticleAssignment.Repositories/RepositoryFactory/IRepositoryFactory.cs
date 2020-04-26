namespace ArticleAssignment.Repositories
{
    public interface IRepositoryFactory
    {
        ITagRepository TagRepository { get; }
        IArticleRepository ArticleRepository { get; }
        IAuthorRepository AuthorRepository { get; }
        IStateRepository StateRepository { get; }
        IEntityStateRepository EntityStateRepository { get; }
        ICommentRepository CommentRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        IArticleCommentRepository ArticleCommentRepository { get; }
        IArticleTagRepository ArticleTagRepository { get; }
    }
}
