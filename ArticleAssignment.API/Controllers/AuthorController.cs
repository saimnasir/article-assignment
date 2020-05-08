using System;
using System.Collections.Generic;
using ArticleAssignment.Core;
using ArticleAssignment.Repositories;
using ArticleAssignment.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ArticleAssignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IRepositoryFactory _repositoryFactory;
        private readonly IAuthorRepository _repository;
        private readonly IMapper _mapper;

        private readonly IErrorText _errorGenerator;
        public AuthorController(
            IRepositoryFactory repositoryFactory,
            IMapper mapper,
            IErrorText errorGenerator)
        {
            _repositoryFactory = repositoryFactory;
            _repository = _repositoryFactory.AuthorRepository;
            _mapper = mapper;
            _errorGenerator = errorGenerator;
        }

        // GET: api/Author
        [HttpGet]
        [Route("ListAll")]
        public ActionResult<IEnumerable<Author>> ListAll()
        {
            try
            {
                var dataModels = _repository.ListAll();
                var viewModels = _mapper.Map<List<Author>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<Author>(ActionType.List, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message);
                throw new Exception(messageResponse.Message);
            }
        }

        // GET: api/Author/5
        [HttpGet]
        [Route("Read")]
        public ActionResult<Author> Read(long id)
        {
            try
            {
                var dataModel = _repository.Read(id);
                var viewModel = _mapper.Map<Author>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<Author, object>(ActionType.Read, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        // POST: api/Author
        [HttpPost]
        public ActionResult Create(Author viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Author>(viewModel);
               
                dataModel = _repository.Create(dataModel);
                viewModel = _mapper.Map<Author>(dataModel);
                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<Author, Author>(ActionType.Create, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }

        // PUT: api/Author/5
        [HttpPut]
        public ActionResult<Author> Update(Author viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Author>(viewModel);                
                dataModel = _repository.Update(dataModel);
                viewModel = _mapper.Map<Author>(dataModel);
                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<Author, Author>(ActionType.Update, viewModel, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, viewModel);
                throw new Exception(messageResponse.Message);
            }
        }

        // DELETE: api/Author/5
        [HttpDelete("{id}")]
        public ActionResult<Author> Delete(long id)
        {
            try
            {
                if (_repository.Delete(id) != EntityStates.Deleted)
                {
                    throw new Exception(_errorGenerator.GetExceptionResponse<Author>(ActionType.Delete));
                }

                var messageResponse = _errorGenerator.GetMessageResponse<Author>(ActionType.Delete, id, success: true);
                Log.Warning(messageResponse.LogTemplate, messageResponse.Message);
                return new JsonResult(new { messageResponse.Message });
            }
            catch (Exception ex)
            {
                var input = new { Id = id };
                var messageResponse = _errorGenerator.GetMessageResponse<Author, object>(ActionType.Delete, input, exception: ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }


        // POST: api/Author/Search
        [HttpPost]
        [Route("Search")]
        public ActionResult<List<Author>> Search(SearchAuthorInput input)
        {
            try
            {
                var dataModels = _repository.Search(input);
                var viewModels = _mapper.Map<List<Author>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<Author, SearchAuthorInput>(ActionType.List, input, ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

    }
}
