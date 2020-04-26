using System.Collections.Generic;
using ArticleAssignment.Repositories;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Serilog;
using System;
using ArticleAssignment.ViewModels;
using ArticleAssignment.Core;
using ArticleAssignment.Core.Enums;

namespace ArticleAssignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IRepositoryFactory _repositoryFactory;
        private readonly IArticleRepository _articleRepository;
        private readonly IMapper _mapper;
        private readonly IErrorText _errorGenerator;
        public ArticleController(
           IRepositoryFactory repositoryFactory,
           IMapper mapper,
           IErrorText errorGenerator)
        {
            _repositoryFactory = repositoryFactory;
            _mapper = mapper;
            _errorGenerator = errorGenerator;

            _articleRepository = _repositoryFactory.ArticleRepository;
        }

        // GET: api/Article
        [HttpGet]
        public ActionResult<IEnumerable<Article>> ListAll()
        {
            try
            {
                var dataModels = _articleRepository.ListAll();
                var viewModels = _mapper.Map<List<Article>>(dataModels);
                viewModels.ForEach(viewModel =>
                {
                    getArticleDetails(viewModel);
                });
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<Article>(ActionType.List, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message);
                throw new Exception(messageResponse.Message);
            }
        }

        // GET: api/Article/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult<Article> Read(long id)
        {
            try
            {
                var dataModel = _articleRepository.Read(id);
                var viewModel = _mapper.Map<Article>(dataModel);
                getArticleDetails(viewModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<Article, object>(ActionType.Read, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        // POST: api/Article
        [HttpPost]
        public ActionResult<Article> Create(Article viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Article>(viewModel);
                dataModel = _articleRepository.Create(dataModel, null);
                viewModel = _mapper.Map<Article>(dataModel);
                getArticleDetails(viewModel);

                return viewModel;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<Article, Article>(ActionType.Create, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }

        // PUT: api/Article/5
        [HttpPut]
        public ActionResult<Article> Update(Article viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Article>(viewModel);
                dataModel = _articleRepository.Update(dataModel);

                viewModel = _mapper.Map<Article>(dataModel);
                getArticleDetails(viewModel);

                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<Article, Article>(ActionType.Update, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }


        // DELETE: api/Article/5
        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            try
            {
                if (_articleRepository.Delete(id) != EntityStates.Deleted)
                {
                    throw new Exception(_errorGenerator.GetExceptionResponse<Article>(ActionType.Delete));
                }

                var messageResponse = _errorGenerator.GetMessageResponse<Article>(ActionType.Delete, id, success: true);
                Log.Warning(messageResponse.LogTemplate, messageResponse.Message);
                return new JsonResult(new { messageResponse.Message });
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<Article, object>(ActionType.Delete, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }


        // POST: api/Article/Search
        [HttpPost]
        [Route("Search")]
        public ActionResult<List<Article>> Search(SearchArticleInput input)
        {
            try
            {
                var dataModels = _articleRepository.Search(input);
                var viewModels = _mapper.Map<List<Article>>(dataModels);
                viewModels.ForEach(viewModel =>
                {
                    getArticleDetails(viewModel);
                });
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<Article, SearchArticleInput>(ActionType.List, input, ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        // POST: api/Article/Check
        [HttpPost]
        [Route("Check/{id}")]
        public ActionResult<Article> Check(long id)
        {
            try
            {
                var dataModel = _articleRepository.Check(id);
                var viewModel = _mapper.Map<Article>(dataModel);
                getArticleDetails(viewModel);

                return viewModel;
            }
            catch (Exception ex)
            {
                var input = new
                {
                    Id = id,
                    Action = "Check"
                };
                var messageResponse = _errorGenerator.GetMessageResponse<Article, object>(ActionType.Update, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }


        // POST: api/Article/Check
        [HttpPost]
        [Route("Approve/{id}")]
        public ActionResult<Article> Approve(long id)
        {
            try
            {
                var dataModel = _articleRepository.Approve(id);
                var viewModel = _mapper.Map<Article>(dataModel);
                getArticleDetails(viewModel);

                return viewModel;
            }
            catch (Exception ex)
            {
                var input = new
                {
                    Id = id,
                    Action = "Approve"
                };
                var messageResponse = _errorGenerator.GetMessageResponse<Article, object>(ActionType.Update, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        // POST: api/Article/Check/5
        [HttpPost]
        [Route("Reject/{id}")]
        public ActionResult<Article> Reject(long id)
        {
            try
            {
                var dataModel = _articleRepository.Reject(id);
                var viewModel = _mapper.Map<Article>(dataModel);
                getArticleDetails(viewModel);

                return viewModel;
            }
            catch (Exception ex)
            {
                var input = new
                {
                    Id = id,
                    Action = "Approve"
                };
                var messageResponse = _errorGenerator.GetMessageResponse<Article, object>(ActionType.Update, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, id);
                throw new Exception(messageResponse.Message);
            }
        }


        private void getArticleDetails(Article article)
        {
            readAuthor(article);

            readCategory(article);

            listComments(article);

            listTags(article);

            readState(article);
        }

        private void readAuthor(Article article)
        {
            var author = _repositoryFactory.AuthorRepository.Read(article.AuthorId);
            if (author == null)
            {
                throw new Exception(_errorGenerator.GetExceptionResponse<Article, Author>(ActionType.Create));
            }
            article.Author = _mapper.Map<Author>(author);
        }
        private void readCategory(Article article)
        {
            var category = _repositoryFactory.CategoryRepository.Read(article.CategoryId);
            if (category == null)
            {
                throw new Exception(_errorGenerator.GetExceptionResponse<Article, Category>(ActionType.Read));
            }
            article.Category = _mapper.Map<Category>(category);
        }

        private void listComments(Article article)
        {
            var input = new SearchCommentInput
            {
                ArticleId = article.Id
            };
            var comments = _repositoryFactory.CommentRepository.Search(input);
            article.Comments = _mapper.Map<List<Comment>>(comments);
        }

        private void listTags(Article article)
        {
            var input = new SearchTagInput
            {
                ArticleId = article.Id
            }; 
            var tags = _repositoryFactory.TagRepository.Search(input);
            article.Tags = _mapper.Map<List<Tag>>(tags);
        }


        private void readState(Article article)
        {
            var state = _repositoryFactory.StateRepository.Read((long)article.State);
            if (state == null)
            {
                throw new Exception(_errorGenerator.GetExceptionResponse<Article, State>(ActionType.Read));
            }
            article.Status = state.Name;
        }


    }
}