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
    public class StateController : ControllerBase
    {
        private readonly IRepositoryFactory _repositoryFactory;
        private readonly IStateRepository _repository;
        private readonly IMapper _mapper;
        private readonly IErrorText _errorGenerator;
        public StateController(
            IRepositoryFactory repositoryFactory,
            IMapper mapper,
            IErrorText errorGenerator)
        {
            _repositoryFactory = repositoryFactory;
            _repository = _repositoryFactory.StateRepository;
            _mapper = mapper;
            _errorGenerator = errorGenerator;
        }

        // GET: api/State
        [HttpGet]
        public ActionResult<IEnumerable<ViewModels.State>> ListAll()
        {
            try
            {
                var dataModels = _repository.ListAll();
                var viewModels = _mapper.Map<List<ViewModels.State>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.State>(ActionType.List, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message);
                throw new Exception(messageResponse.Message);
            }
        }

        // GET: api/State/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewModels.State> Read(long id)
        {
            try
            {
                var dataModel = _repository.Read(id);
                var viewModel = _mapper.Map<ViewModels.State>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.State, object>(ActionType.Read, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        // POST: api/State
        [HttpPost]
        public ActionResult<ViewModels.State> Create(ViewModels.State viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.State>(viewModel);
                dataModel = _repository.Create(dataModel);
                viewModel = _mapper.Map<ViewModels.State>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.State, ViewModels.State>(ActionType.Create, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }

        // PUT: api/State/5
        [HttpPut]
        public ActionResult<ViewModels.State> Update(ViewModels.State viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.State>(viewModel);
                dataModel = _repository.Update(dataModel);

                viewModel = _mapper.Map<ViewModels.State>(dataModel);
                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.State, ViewModels.State>(ActionType.Update, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }


        // DELETE: api/State/5
        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            try
            {
                if (_repository.Delete(id) != EntityStates.Deleted)
                {
                    throw new Exception(_errorGenerator.GetExceptionResponse<DataModels.State>(ActionType.Delete));
                }

                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.State>(ActionType.Delete, id, success: true);
                Log.Warning(messageResponse.LogTemplate, messageResponse.Message);
                return new JsonResult(new { messageResponse.Message });
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.State, object>(ActionType.Delete, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }


        // POST: api/State/Search
        [HttpPost]
        [Route("Search")]
        public ActionResult<List<ViewModels.State>> Search(SearchInputBase input)
        {
            try
            {
                var dataModels = _repository.Search(input);
                var viewModels = _mapper.Map<List<ViewModels.State>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.State, SearchInputBase>(ActionType.List, input, ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }
    }
}