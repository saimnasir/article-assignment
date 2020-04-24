using System.Collections.Generic;
using System.Linq;
using ArticleAssignment.Repositories;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using ArticleAssignment.DataModels.Dto;
using Serilog;
using System;
using ArticleAssignment.Extensions;
using ArticleAssignment.ViewModels;

namespace ArticleAssignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleRepository _repository;
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;
        private readonly IErrorText _errorGenerator;
        public ArticleController(
            IArticleRepository repository,
            IAuthorRepository authorRepository,
            IMapper mapper,
            IErrorText errorGenerator)
        {
            _repository = repository;
            _authorRepository = authorRepository;
            _mapper = mapper;
            _errorGenerator = errorGenerator;
        }

        // GET: api/Article
        [HttpGet]
        public ActionResult<IEnumerable<Article>> ListAll()
        {
            try
            {
                var dataModels = _repository.ListAll();
                var viewModels = _mapper.Map<List<Article>>(dataModels);
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
                var dataModel = _repository.Read(id);
                var viewModel = _mapper.Map<Article>(dataModel);
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
                var author = _authorRepository.Read(viewModel.Author);
                if (author == null)
                {
                    throw new Exception(_errorGenerator.GetExceptionResponse<Article, Author>(ActionType.Create));
                }

                var dataModel = _mapper.Map<DataModels.Article>(viewModel);
                dataModel = _repository.Create(dataModel);
                viewModel = _mapper.Map<Article>(dataModel);
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
                dataModel = _repository.Update(dataModel);

                viewModel = _mapper.Map<Article>(dataModel);
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
                if (!_repository.Delete(id))
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
                divideByZero();

                var dataModels = _repository.Search(input);
                var viewModels = _mapper.Map<List<Article>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<Article, SearchArticleInput>(ActionType.List, input, ex);
                Log.Error(messageResponse.LogTemplate,  messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        private void divideByZero()
        {
            int i = 0;
            i = 1 / i;
        }

    }
}