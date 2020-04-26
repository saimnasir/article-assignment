using ArticleAssignment.DataModels;
using ArticleAssignment.Queries;
using Microsoft.Extensions.Configuration;
using System.Globalization;

namespace ArticleAssignment.Repositories
{
    public class RepositoryFactory : IRepositoryFactory
    {
        private ITagRepository _tagRepository;
        private IArticleRepository _articleRepository;
        private IAuthorRepository _authorRepository;
        private IStateRepository _stateRepository;
        private IEntityStateRepository _entityStateRepository;
        private ICommentRepository _commentRepository;
        private ICategoryRepository _categoryRepository;
        private IArticleCommentRepository _articleCommentRepository;
        private IArticleTagRepository _articleTagRepository;


        private readonly IConfiguration _configuration;
        private readonly ICommandText _commandText;
        private readonly IExecuters _executers;

        public RepositoryFactory(IConfiguration configuration, ICommandText commandText, IExecuters executers)
        {
            _configuration = configuration;
            _commandText = commandText;
            _executers = executers;
        }

        public string TableName<M>()
        {
            var culture = new CultureInfo("en-EN", false);
            return typeof(M).Name.ToUpper(culture);
        }


        public ITagRepository TagRepository
        {
            get
            {
                if (_tagRepository == null)
                {
                    _tagRepository = new TagRepository(_configuration, _commandText, _executers, TableName<Tag>());
                }
                return _tagRepository;
            }
        }

        public IArticleRepository ArticleRepository
        {
            get
            {
                if (_articleRepository == null)
                {
                    _articleRepository = new ArticleRepository(_configuration, _commandText, _executers, TableName<Article>());
                }
                return _articleRepository;
            }
        }


        public IAuthorRepository AuthorRepository
        {
            get
            {
                if (_authorRepository == null)
                {
                    _authorRepository = new AuthorRepository(_configuration, _commandText, _executers, TableName<Author>());
                }
                return _authorRepository;
            }
        }


        public IStateRepository StateRepository
        {
            get
            {
                if (_stateRepository == null)
                {
                    _stateRepository = new StateRepository(_configuration, _commandText, _executers, TableName<State>());
                }
                return _stateRepository;
            }
        }

        public IEntityStateRepository EntityStateRepository
        {
            get
            {
                if (_entityStateRepository == null)
                {
                    _entityStateRepository = new EntityStateRepository(_configuration, _commandText, _executers, TableName<EntityState>());
                }
                return _entityStateRepository;
            }
        }

        
        public ICommentRepository CommentRepository
        {
            get
            {
                if (_commentRepository == null)
                {
                    _commentRepository = new CommentRepository(_configuration, _commandText, _executers, TableName<Comment>());
                }
                return _commentRepository;
            }
        }

        public ICategoryRepository CategoryRepository
        {
            get
            {
                if (_categoryRepository == null)
                {
                    _categoryRepository = new CategoryRepository(_configuration, _commandText, _executers, TableName<Category>());
                }
                return _categoryRepository;
            }
        }

        
        public IArticleCommentRepository ArticleCommentRepository
        {
            get
            {
                if (_articleCommentRepository == null)
                {
                    _articleCommentRepository = new ArticleCommentRepository(_configuration, _commandText, _executers, TableName<ArticleComment>());
                }
                return _articleCommentRepository;
            }
        }
        public IArticleTagRepository ArticleTagRepository
        {
            get
            {
                if (_articleTagRepository == null)
                {
                    _articleTagRepository = new ArticleTagRepository(_configuration, _commandText, _executers, TableName<ArticleTag>());
                }
                return _articleTagRepository;
            }
        }

    }
}
