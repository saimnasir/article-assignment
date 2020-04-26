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
    public class CategoryController : ControllerBase
    {
        private readonly IRepositoryFactory _repositoryFactory;
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;
        private readonly IErrorText _errorGenerator;
        public CategoryController(
            IRepositoryFactory repositoryFactory,
            IMapper mapper,
            IErrorText errorGenerator)
        {
            _repositoryFactory = repositoryFactory;
            _repository = _repositoryFactory.CategoryRepository;
            _mapper = mapper;
            _errorGenerator = errorGenerator;
        }

        // GET: api/Category
        [HttpGet]
        public ActionResult<IEnumerable<ViewModels.Category>> ListAll()
        {
            try
            {
                var dataModels = _repository.ListAll();
                var viewModels = _mapper.Map<List<ViewModels.Category>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Category>(ActionType.List, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message);
                throw new Exception(messageResponse.Message);
            }
        }

        // GET: api/Category/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewModels.Category> Read(long id)
        {
            try
            {
                var dataModel = _repository.Read(id);
                var viewModel = _mapper.Map<ViewModels.Category>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Category, object>(ActionType.Read, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        // POST: api/Category
        [HttpPost]
        public ActionResult<ViewModels.Category> Create(ViewModels.Category viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Category>(viewModel);
                dataModel = _repository.Create(dataModel);
                viewModel = _mapper.Map<ViewModels.Category>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Category, ViewModels.Category>(ActionType.Create, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }

        // PUT: api/Category/5
        [HttpPut]
        public ActionResult<ViewModels.Category> Update(ViewModels.Category viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Category>(viewModel);
                dataModel = _repository.Update(dataModel);

                viewModel = _mapper.Map<ViewModels.Category>(dataModel);
                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Category, ViewModels.Category>(ActionType.Update, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }


        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            try
            {
                if (_repository.Delete(id) != EntityStates.Deleted)
                {
                    throw new Exception(_errorGenerator.GetExceptionResponse<DataModels.Category>(ActionType.Delete));
                }

                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Category>(ActionType.Delete, id, success: true);
                Log.Warning(messageResponse.LogTemplate, messageResponse.Message);
                return new JsonResult(new { messageResponse.Message });
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Category, object>(ActionType.Delete, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }


        // POST: api/Category/Search
        [HttpPost]
        [Route("Search")]
        public ActionResult<List<ViewModels.Category>> Search(SearchInputBase input)
        {
            try
            {
                var dataModels = _repository.Search(input);
                var viewModels = _mapper.Map<List<ViewModels.Category>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Category, SearchInputBase>(ActionType.List, input, ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }
    }
}