using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Article.Assignment.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using AutoMapper;

namespace Article.Assignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleRepository _repository;
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _viewModelMapper;
        private readonly IMapper _dataModelMapper;

        public ArticleController(IArticleRepository repository, IAuthorRepository authorRepository)
        {
            _repository = repository;
            _authorRepository = authorRepository;

            _viewModelMapper = new MapperConfiguration(cfg => cfg.CreateMap<DataModels.Article, ViewModels.Article>()).CreateMapper();
            _dataModelMapper = new MapperConfiguration(cfg => cfg.CreateMap<ViewModels.Article, DataModels.Article>()).CreateMapper();
        }

        // GET: api/Article
        [HttpGet]
        public ActionResult<IEnumerable<ViewModels.Article>> Get()
        {
            var allAuthors = _authorRepository.ListAll();
            if (!allAuthors.Any())
            {
                return new JsonResult(new { Message = "No Authors were found in the system." });
            }

            var dataModels = _repository.ListAll();
            if (!dataModels.Any())
            {
                return new JsonResult(new { Message = "No Article were found in the system." });
            }

            var viewModels = _viewModelMapper.Map<List<ViewModels.Article>>(dataModels);           
            
            // remove articles where where author is deleted
            viewModels = viewModels.Where(article => allAuthors.Any(author => article.Author == author.Id)).ToList();
            if (!viewModels.Any())
            {
                return new JsonResult(new { Message = "No Article were found in the system." });
            }

            // set author infos
            viewModels.ForEach(article =>
            {
                var author = allAuthors.FirstOrDefault(a => a.Id == article.Author);
                if (author != null)
                {
                    article.AuthorName = author.Name;
                    article.AuthorSurname = author.Surname;
                }
            });

            return viewModels;
        }


        // GET: api/Article/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewModels.Article> Get(long id)
        {
            var dataModel = _repository.Read(id);
            if (dataModel == null)
            {
                return new JsonResult(new { Message = $"Article({id}) is not found." });
            }
            var viewModel = _viewModelMapper.Map<ViewModels.Article>(dataModel);

            var author = _authorRepository.Read(viewModel.Author);
            if (author == null)
            {
                return new JsonResult(new { Message = $"Author({id}) is not found." });
            }

            viewModel.AuthorName = author.Name;
            viewModel.AuthorSurname = author.Surname;
            return viewModel;
        }

        // POST: api/Article
        [HttpPost]
        public ActionResult Post(ViewModels.Article viewModel)
        {
            var author = _authorRepository.Read(viewModel.Author);
            if (author == null)
            {
                return new JsonResult(new { Message = $"Author({viewModel.Author}) is not found." });
            }

            var dataModel = _dataModelMapper.Map<DataModels.Article>(viewModel);
            dataModel = _repository.Create(dataModel);

            viewModel = _viewModelMapper.Map<ViewModels.Article>(dataModel);
            viewModel.AuthorName = author.Name;
            viewModel.AuthorSurname = author.Surname;

            return Ok(viewModel);
        }

        // PUT: api/Article/5
        [HttpPut]
        public ActionResult<ViewModels.Article> Update(ViewModels.Article viewModel)
        {
            var author = _authorRepository.Read(viewModel.Author);

            if (author == null)
            {
                return new JsonResult(new { Message = $"Author({viewModel.Author}) is not found." });
            }

            var dataModel = _dataModelMapper.Map<DataModels.Article>(viewModel);
            dataModel = _repository.Update(dataModel);
            if (dataModel == null)
            {
                return new JsonResult(new { Message = $"Nothing is updated. Article({viewModel.Id}) is not found." });
            }

            viewModel = _viewModelMapper.Map<ViewModels.Article>(dataModel);
            viewModel.AuthorName = author.Name;
            viewModel.AuthorSurname = author.Surname;

            return Ok(viewModel);
        }

        // DELETE: api/Article/5
        [HttpDelete("{id}")]
        public ActionResult<ViewModels.Article> Delete(long id)
        {
            var dataModel = _repository.Read(id);
            if (dataModel == null)
            {
                return new JsonResult(new { Message = $"Nothing is deleted. Article({id}) is not found." });
            }
            _repository.Delete(id);
            return Ok(new JsonResult(new { Message = $"Delete Article({id}) is succeed." }));
        }
    }
}