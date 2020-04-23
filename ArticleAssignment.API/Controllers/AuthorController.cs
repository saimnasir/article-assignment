using System;
using System.Collections.Generic;
using System.Linq;
using ArticleAssignment.Repositories;
using AutoMapper;
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
                if (dataModels == null || !dataModels.Any())
                {
                    Log.Warning("No Authors were found");
                    return new JsonResult(new
                    {
                        Message = $"No Authors are found."
                    });
                }
                var viewModels = _mapper.Map<List<ViewModels.Author>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "List All Authors failed.");
                return new JsonResult(new
                {
                    Message = $"List All Authors failed. Error: {ex.Message}"
                });
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
                    Log.Warning("Author not found. [id:{0}]", id);
                    return new JsonResult(new
                    {
                        Message = $"Author not found. [id:{id}]"
                    });
                }
                var viewModel = _mapper.Map<ViewModels.Author>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Read Author failed. [id:{0}]", id);
                return new JsonResult(new
                {
                    Message = $"Read Author failed. [id:{id}]\n\tError: {ex.Message}"
                });
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
                Log.Error(ex, "Create Author failed.", viewModel);
                return new JsonResult(new
                {
                    Message = $"Create Author failed.[name:{viewModel.Name}]\n\tError: {ex.Message}"
                });
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
                    Log.Warning("Nothing updated. Author not found. [id: {0}]", viewModel.Id);
                    return new JsonResult(new
                    {
                        Message = $"Nothing updated. Author not found. [id :{viewModel.Id}]"
                    });
                }
                viewModel = _mapper.Map<ViewModels.Author>(dataModel);
                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Update Author failed. [id: {0}]", viewModel.Id);
                return new JsonResult(new
                {
                    Message = $"Read Author failed.[id: {viewModel.Id}]\n\tError: {ex.Message}"
                });
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
                    Log.Warning("Nothing deleted. Author not found. [id:{0}]", id);
                    return new JsonResult(new
                    {
                        Message = $"Nothing deleted. Author not found. [id:{id}]"
                    });
                }
                
                Log.Warning("Delete Author succeed. [id:{0}]", id);
                return new JsonResult(new
                {
                    Message = $"Delete Author succeed."
                });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Delete Author failed. [id:{0}]", id);
                return new JsonResult(new
                {
                    Message = $"Delete Author failed. [id:{id}]\n\tError: {ex.Message}"
                });
            }
        }
    }
}
