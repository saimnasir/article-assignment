using System.Collections.Generic;
using ArticleAssignment.Repositories;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Serilog;
using System;
using ArticleAssignment.Core;
using System.Linq;

namespace ArticleAssignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly IRepositoryFactory _repositoryFactory;
        private readonly ITagRepository _repository;
        private readonly IMapper _mapper;
        private readonly IErrorText _errorGenerator;
        public TagController(
            IRepositoryFactory repositoryFactory,
            IMapper mapper,
            IErrorText errorGenerator)
        {
            _repositoryFactory = repositoryFactory;
            _repository = _repositoryFactory.TagRepository;
            _mapper = mapper;
            _errorGenerator = errorGenerator;
        }

        // GET: api/Tag
        [HttpGet]
        [Route("ListAll")]
        public ActionResult<IEnumerable<ViewModels.Tag>> ListAll()
        {
            try
            {
                var dataModels = _repository.ListAll();
                var viewModels = _mapper.Map<List<ViewModels.Tag>>(dataModels);
                return viewModels.OrderBy(tag => tag.Title).ToList();
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Tag>(ActionType.List, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message);
                throw new Exception(messageResponse.Message);
            }
        }

        // GET: api/Tag/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewModels.Tag> Read(long id)
        {
            try
            {
                var dataModel = _repository.Read(id);
                var viewModel = _mapper.Map<ViewModels.Tag>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Tag, object>(ActionType.Read, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        // POST: api/Tag
        [HttpPost]
        [Route("Create")]
        public ActionResult<ViewModels.Tag> Create(ViewModels.Tag viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Tag>(viewModel);
                dataModel = _repository.Create(dataModel);
                viewModel = _mapper.Map<ViewModels.Tag>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Tag, ViewModels.Tag>(ActionType.Create, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }

        // PUT: api/Tag/Update
        [HttpPut]
        [Route("Update")]
        public ActionResult<ViewModels.Tag> Update(ViewModels.Tag viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Tag>(viewModel);
                dataModel = _repository.Update(dataModel);

                viewModel = _mapper.Map<ViewModels.Tag>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Tag, ViewModels.Tag>(ActionType.Update, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }

        // DELETE: api/Tag/Delete
        [HttpDelete]
        [Route("Delete")]
        public ActionResult Delete(long id)
        {
            try
            {
                if (_repository.Delete(id) != EntityStates.Deleted)
                {
                    throw new Exception(_errorGenerator.GetExceptionResponse<DataModels.Tag>(ActionType.Delete));
                }

                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Tag>(ActionType.Delete, id, success: true);
                Log.Warning(messageResponse.LogTemplate, messageResponse.Message);
                return new JsonResult(new { messageResponse.Message });
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Tag, object>(ActionType.Delete, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }


        // POST: api/Tag/Search
        [HttpPost]
        [Route("Search")]
        public ActionResult<List<ViewModels.Tag>> Search(SearchTagInput input)
        {
            try
            {                
                var dataModels = _repository.Search(input);
                var viewModels = _mapper.Map<List<ViewModels.Tag>>(dataModels);
                return viewModels.OrderBy(tag => tag.Title).ToList();
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Tag, SearchInputBase>(ActionType.List, input, ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }


        //// GET: api/Comment/ListByMaster/
        //[HttpGet]
        //[Route("ListByMaster/{masterId}")]
        //public ActionResult<IEnumerable<ViewModels.Tag>> ListByMaster(long masterId)
        //{
        //    var input = new SearchTagInput { ArticleId = masterId };
        //    try
        //    {
        //        var dataModels = _repository.Search(input);
        //        var viewModels = _mapper.Map<List<ViewModels.Tag>>(dataModels);
        //        return viewModels;
        //    }
        //    catch (Exception ex)
        //    {
        //        var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Tag, SearchTagInput>(ActionType.List, input, ex);
        //        Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
        //        throw new Exception(messageResponse.Message);
        //    }
        //}

    }
}