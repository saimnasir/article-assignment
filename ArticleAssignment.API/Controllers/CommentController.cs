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
    public class CommentController : ControllerBase
    {
        private readonly IRepositoryFactory _repositoryFactory;
        private readonly ICommentRepository _repository;
        private readonly IMapper _mapper;
        private readonly IErrorText _errorGenerator;
        public CommentController(
            IRepositoryFactory repositoryFactory,
            IMapper mapper,
            IErrorText errorGenerator)
        {
            _repositoryFactory = repositoryFactory;
            _repository = _repositoryFactory.CommentRepository;
            _mapper = mapper;
            _errorGenerator = errorGenerator;
        }

        // GET: api/Comment
        [HttpGet]
        [Route("ListAll")]
        public ActionResult<IEnumerable<ViewModels.Comment>> ListAll()
        {
            try
            {
                var dataModels = _repository.ListAll();
                var viewModels = _mapper.Map<List<ViewModels.Comment>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Comment>(ActionType.List, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message);
                throw new Exception(messageResponse.Message);
            }
        }

        // GET: api/Comment/5
        [HttpGet]
        [Route("Read/{id}")]
        public ActionResult<ViewModels.Comment> Read(long id)
        {
            try
            {
                var dataModel = _repository.Read(id);
                var viewModel = _mapper.Map<ViewModels.Comment>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Comment, object>(ActionType.Read, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        // POST: api/Comment
        [HttpPost]
        [Route("Create")]
        public ActionResult<ViewModels.Comment> Create(ViewModels.Comment viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Comment>(viewModel);
                dataModel = _repository.Create(dataModel);
                viewModel = _mapper.Map<ViewModels.Comment>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Comment, ViewModels.Comment>(ActionType.Create, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }

        // PUT: api/Comment/5
        [HttpPut]
        [Route("Update")]
        public ActionResult<ViewModels.Comment> Update(ViewModels.Comment viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Comment>(viewModel);
                dataModel = _repository.Update(dataModel);

                viewModel = _mapper.Map<ViewModels.Comment>(dataModel);
                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Comment, ViewModels.Comment>(ActionType.Update, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }


        // DELETE: api/Comment/5
        [HttpDelete]
        [Route("Delete/{id}")]
        public ActionResult Delete(long id)
        {
            try
            {
                if (_repository.Delete(id) != EntityStates.Deleted)
                {
                    throw new Exception(_errorGenerator.GetExceptionResponse<DataModels.Comment>(ActionType.Delete));
                }

                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Comment>(ActionType.Delete, id, success: true);
                Log.Warning(messageResponse.LogTemplate, messageResponse.Message);
                return new JsonResult(new { messageResponse.Message });
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Comment, object>(ActionType.Delete, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }


        // POST: api/Comment/Search
        [HttpPost]
        [Route("Search")]
        public ActionResult<IEnumerable<ViewModels.Comment>> Search(SearchCommentInput input)
        {
            try
            {
                var dataModels = _repository.Search(input);
                var viewModels = _mapper.Map<List<ViewModels.Comment>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Comment, SearchInputBase>(ActionType.List, input, ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        //// GET: api/Comment/ListByMaster/
        //[HttpGet]
        //[Route("ListByMaster/{masterId}")]
        //public ActionResult<IEnumerable<ViewModels.Comment>> ListByMaster(long masterId)
        //{
        //    var input = new SearchCommentInput { ArticleId = masterId };
        //    try
        //    {
        //        var dataModels = _repository.Search(input);
        //        var viewModels = _mapper.Map<List<ViewModels.Comment>>(dataModels);
        //        return viewModels;
        //    }
        //    catch (Exception ex)
        //    {
        //        var messageResponse = _errorGenerator.GetMessageResponse<DataModels.Comment, SearchInputBase>(ActionType.List, input, ex);
        //        Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
        //        throw new Exception(messageResponse.Message);
        //    }
        //}

    }
}