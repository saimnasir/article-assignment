﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArticleAssignment.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ArticleAssignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorRepository _repository;
        private readonly IMapper _mapper;

        public AuthorController(IAuthorRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // GET: api/Author
        [HttpGet]
        public ActionResult<IEnumerable<ViewModels.Author>> ListAll()
        {
            try
            {
                var dataModels = _repository.ListAll();
                var viewModels = _mapper.Map<List<ViewModels.Author>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Get Author is failed.");
                throw;
            }
        }

        // GET: api/Author/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewModels.Author> Read(long id)
        {
            try
            {
                var dataModel = _repository.Read(id);
                if (dataModel == null)
                {
                    return new JsonResult(new { Message = $"Author({id}) is not found." });
                }
                var viewModel = _mapper.Map<ViewModels.Author>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Get Author [id:{0}] is failed.", id);
                throw;
            }
        }

        // POST: api/Author
        [HttpPost]
        public ActionResult Create(ViewModels.Author viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Author>(viewModel);
                dataModel = _repository.Create(dataModel);
                viewModel = _mapper.Map<ViewModels.Author>(dataModel);
                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Create Author is failed. {0}", viewModel);
                throw;
            }
        }

        // PUT: api/Author/5
        [HttpPut]
        public ActionResult<ViewModels.Author> Update(ViewModels.Author viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Author>(viewModel);
                dataModel = _repository.Update(dataModel);
                if (viewModel == null)
                {
                    return new JsonResult(new { Message = $"Nothing is updated. Author({viewModel.Id}) is not found." });
                }
                viewModel = _mapper.Map<ViewModels.Author>(dataModel);
                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Update Author [id:{0}]  is failed. {0}", viewModel.Id, viewModel);
                throw;
            }
        }

        // DELETE: api/Author/5
        [HttpDelete("{id}")]
        public ActionResult<ViewModels.Author> Delete(long id)
        {
            try
            {
                if (!_repository.Delete(id))
                {
                    return new JsonResult(new { Message = $"Nothing is deleted. Author({id}) is not found." });
                }
                return Ok(new JsonResult(new { Message = $"Delete Author({id}) is succeed." }));
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Delete Author [id:{0}]  is failed. {0}", id);
                throw;
            }
        }
    }
}