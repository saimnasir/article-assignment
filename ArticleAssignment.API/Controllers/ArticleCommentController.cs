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
    public class ArticleCommentController : ControllerBase
    {
        private readonly IRepositoryFactory _repositoryFactory;
        private readonly IArticleCommentRepository _repository;
        private readonly IMapper _mapper;
        private readonly IErrorText _errorGenerator;
        public ArticleCommentController(
            IRepositoryFactory repositoryFactory,
            IMapper mapper,
            IErrorText errorGenerator)
        {
            _repositoryFactory = repositoryFactory;
            _repository = _repositoryFactory.ArticleCommentRepository;
            _mapper = mapper;
            _errorGenerator = errorGenerator;
        }

        // GET: api/ArticleComment
        [HttpGet]
        public ActionResult<IEnumerable<ViewModels.ArticleComment>> ListAll()
        {
            try
            {
                var dataModels = _repository.ListAll();
                var viewModels = _mapper.Map<List<ViewModels.ArticleComment>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleComment>(ActionType.List, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message);
                throw new Exception(messageResponse.Message);
            }
        }

        // GET: api/ArticleComment/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewModels.ArticleComment> Read(long id)
        {
            try
            {
                var dataModel = _repository.Read(id);
                var viewModel = _mapper.Map<ViewModels.ArticleComment>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleComment, object>(ActionType.Read, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        // POST: api/ArticleComment
        [HttpPost]
        public ActionResult<ViewModels.ArticleComment> Create(ViewModels.ArticleComment viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.ArticleComment>(viewModel);
                dataModel = _repository.Create(dataModel);
                viewModel = _mapper.Map<ViewModels.ArticleComment>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleComment, ViewModels.ArticleComment>(ActionType.Create, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }

        // PUT: api/ArticleComment/5
        [HttpPut]
        public ActionResult<ViewModels.ArticleComment> Update(ViewModels.ArticleComment viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.ArticleComment>(viewModel);
                dataModel = _repository.Update(dataModel);

                viewModel = _mapper.Map<ViewModels.ArticleComment>(dataModel);
                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleComment, ViewModels.ArticleComment>(ActionType.Update, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }


        // DELETE: api/ArticleComment/5
        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            try
            {
                if (_repository.Delete(id) != EntityStates.Deleted)
                {
                    throw new Exception(_errorGenerator.GetExceptionResponse<DataModels.ArticleComment>(ActionType.Delete));
                }

                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleComment>(ActionType.Delete, id, success: true);
                Log.Warning(messageResponse.LogTemplate, messageResponse.Message);
                return new JsonResult(new { messageResponse.Message });
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<DataModels.ArticleComment, object>(ActionType.Delete, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }
    }
}