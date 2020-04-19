using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Article.Assignment.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Article.Assignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorRepository _repository;

        private readonly IMapper _viewModelMapper;
        private readonly IMapper _dataModelMapper;

        public AuthorController(IAuthorRepository repository)
        {
            _repository = repository;

            _viewModelMapper = new MapperConfiguration(cfg => cfg.CreateMap<DataModels.Author, ViewModels.Author>()).CreateMapper();
            _dataModelMapper = new MapperConfiguration(cfg => cfg.CreateMap<ViewModels.Author, DataModels.Author>()).CreateMapper();

        }

        // GET: api/Author
        [HttpGet]
        public ActionResult<IEnumerable<ViewModels.Author>> Get()
        {
            var dataModels = _repository.ListAll();
            if (!dataModels.Any())
            {
                return new JsonResult(new { Message = "No Authors were found in the system" });
            }

            var viewModels = _viewModelMapper.Map<List<ViewModels.Author>>(dataModels);

            return viewModels;
        }

        // GET: api/Author/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewModels.Author> Get(long id)
        {
            var dataModel = _repository.Read(id);
            if (dataModel == null)
            {
                return new JsonResult(new { Message = $"Author({id}) is not found." });
            }

            var viewModel = _viewModelMapper.Map<ViewModels.Author>(dataModel);

            return viewModel;
        }

        // POST: api/Author
        [HttpPost]
        public ActionResult Post(ViewModels.Author viewModel)
        {
            var dataModel = _dataModelMapper.Map<DataModels.Author>(viewModel);
            dataModel = _repository.Create(dataModel);

            viewModel = _viewModelMapper.Map<ViewModels.Author>(dataModel);
            return Ok(viewModel);
        }

        // PUT: api/Author/5
        [HttpPut]
        public ActionResult<ViewModels.Author> Update(ViewModels.Author viewModel)
        {
            var dataModel = _dataModelMapper.Map<DataModels.Author>(viewModel);
            dataModel = _repository.Update(dataModel);
            if (dataModel == null)
            {
                return new JsonResult(new { Message = $"Nothing is updated. Author({viewModel.Id}) is not found." });
            }
            viewModel = _viewModelMapper.Map<ViewModels.Author>(dataModel);             
            return Ok(viewModel);
        }

        // DELETE: api/Author/5
        [HttpDelete("{id}")]
        public ActionResult<ViewModels.Author> Delete(long id)
        {
            var dataModel = _repository.Read(id);
            if (dataModel == null)
            {
                return new JsonResult(new { Message = $"Nothing is deleted. Author({id}) is not found." });
            }
            _repository.Delete(id);
            return Ok(new JsonResult(new { Message = $"Delete Author({id}) is succeed." }));
        }
    }
}
