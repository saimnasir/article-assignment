using System.Collections.Generic;
using ArticleAssignment.Repositories;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Serilog;
using System;
using ArticleAssignment.Core;

namespace ArticleAssignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleTagController : ControllerBase
    {
        private readonly IRepositoryFactory _repositoryFactory;
        private readonly IArticleTagRepository _repository;
        private readonly IMapper _mapper;
        private readonly IErrorText _errorGenerator;
        public ArticleTagController(
            IRepositoryFactory repositoryFactory,
            IMapper mapper,
            IErrorText errorGenerator)
        {
            _repositoryFactory = repositoryFactory;
            _repository = _repositoryFactory.ArticleTagRepository;
            _mapper = mapper;
            _errorGenerator = errorGenerator;
        }

        // GET: api/ArticleTag
        [HttpGet]
        public ActionResult<IEnumerable<ViewModels.ArticleTag>> ListAll()
        {
            try
            {
                var dataModels = _repository.ListAll();
                var viewModels = _mapper.Map<List<ViewModels.ArticleTag>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleTag>(ActionType.List, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message);
                throw new Exception(messageResponse.Message);
            }
        }

        // GET: api/ArticleTag/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewModels.ArticleTag> Read(long id)
        {
            try
            {
                var dataModel = _repository.Read(id);
                var viewModel = _mapper.Map<ViewModels.ArticleTag>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleTag, object>(ActionType.Read, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        // POST: api/ArticleTag
        [HttpPost]
        public ActionResult<ViewModels.ArticleTag> Create(ViewModels.ArticleTag viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.ArticleTag>(viewModel);
                dataModel = _repository.Create(dataModel);
                viewModel = _mapper.Map<ViewModels.ArticleTag>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleTag, ViewModels.ArticleTag>(ActionType.Create, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }

        // PUT: api/ArticleTag/5
        [HttpPut]
        public ActionResult<ViewModels.ArticleTag> Update(ViewModels.ArticleTag viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.ArticleTag>(viewModel);
                dataModel = _repository.Update(dataModel);

                viewModel = _mapper.Map<ViewModels.ArticleTag>(dataModel);
                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleTag, ViewModels.ArticleTag>(ActionType.Update, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }


        // DELETE: api/ArticleTag/5
        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            try
            {
                if (_repository.Delete(id) != EntityStates.Deleted)
                {
                    throw new Exception(_errorGenerator.GetExceptionResponse<DataModels.ArticleTag>(ActionType.Delete));
                }

                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleTag>(ActionType.Delete, id, success: true);
                Log.Warning(messageResponse.LogTemplate, messageResponse.Message);
                return new JsonResult(new { messageResponse.Message });
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleTag, object>(ActionType.Delete, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }


        // POST: api/ArticleTag/Search
        [HttpPost]
        [Route("Search")]
        public ActionResult<List<ViewModels.ArticleTag>> Search(SearchInputBase input)
        {
            try
            {
                divideByZero();
                var dataModels = _repository.Search(input);
                var viewModels = _mapper.Map<List<ViewModels.ArticleTag>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleTag, SearchInputBase>(ActionType.List, input, ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
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