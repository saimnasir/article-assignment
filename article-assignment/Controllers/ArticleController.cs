using System.Collections.Generic;
using System.Linq;
using ArticleAssignment.Repositories;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using ArticleAssignment.DataModels.Dto;
using Serilog;
using System;

namespace ArticleAssignment.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleRepository _repository;
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;
        public ArticleController(IArticleRepository repository, IAuthorRepository authorRepository, IMapper mapper)
        {
            _repository = repository;
            _authorRepository = authorRepository;
            _mapper = mapper;
        }

        // GET: api/Article
        [HttpGet]
        public ActionResult<IEnumerable<ViewModels.Article>> Get()
        {
            try
            {
                var dataModels = _repository.ListAll();
                var viewModels = _mapper.Map<List<ViewModels.Article>>(dataModels);
                if (!viewModels.Any())
                {
                    return viewModels;
                }
                viewModels.ForEach(article =>
                {
                    fillAuthorInformations(article);
                });
                return viewModels;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Get Articles is failed.");
                throw;
            }
        }

        // GET: api/Article/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewModels.Article> Get(long id)
        {
            try
            {
                var dataModel = _repository.Read(id);
                var viewModel = _mapper.Map<ViewModels.Article>(dataModel);
               
                    fillAuthorInformations(viewModel);

                return viewModel;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Get Article [id:{0}] is failed.", id);
                throw;
            }
        }

        // POST: api/Article
        [HttpPost]
        public ActionResult Post(ViewModels.Article viewModel)
        {
            try
            {
                var author = _authorRepository.Read(viewModel.Author);
                if (author == null)
                {
                    return new JsonResult(new { Message = $"Create Article is failed. Author ({viewModel.Author}) is not exists or deleted." });
                }
                var dataModel = _mapper.Map<DataModels.Article>(viewModel);
                dataModel = _repository.Create(dataModel);
                viewModel = _mapper.Map<ViewModels.Article>(dataModel);

                fillAuthorInformations(viewModel);

                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Create Article is failed. {0}", viewModel);
                throw;
            }
        }

        // PUT: api/Article/5
        [HttpPut]
        public ActionResult<ViewModels.Article> Update(ViewModels.Article viewModel)
        {
            try
            {
                var dataModel = _mapper.Map<DataModels.Article>(viewModel);
                dataModel = _repository.Update(dataModel);
                if (dataModel == null)
                {
                    return new JsonResult(new { Message = $"Nothing is updated. Article({viewModel.Id}) is not found." });
                }

                viewModel = _mapper.Map<ViewModels.Article>(dataModel);
                fillAuthorInformations(viewModel);

                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Update Article [id:{0}]  is failed. {0}", viewModel.Id, viewModel);
                throw;
            }
        }


        // DELETE: api/Article/5
        [HttpDelete("{id}")]
        public ActionResult<ViewModels.Article> Delete(long id)
        {
            try
            {
                if (!_repository.Delete(id))
                {
                    return new JsonResult(new { Message = $"Nothing is deleted. Article({id}) is not found." });
                }
                return Ok(new JsonResult(new { Message = $"Delete Article({id}) is succeed." }));
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Delete Article [id:{0}]  is failed. {0}", id);
                throw;
            }
        }


        // POST: api/Article/Search
        [HttpPost]
        [Route("Search")]
        public ActionResult<List<ViewModels.Article>> Search(SearchArticleInput input)
        {
            try
            {
                var dataModels = _repository.Search(input);
               
                var viewModels = _mapper.Map<List<ViewModels.Article>>(dataModels);

                viewModels.ForEach(article =>
                {
                    fillAuthorInformations(article);
                });

                return viewModels;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Search Articles is failed.");
                throw;
            }
        }

        private void fillAuthorInformations(ViewModels.Article viewModel)
        {
            if (viewModel != null)
            {
                var author = _authorRepository.Read(viewModel.Author);
                viewModel.AuthorName = author.Name;
                viewModel.AuthorSurname = author.Surname;
            }
        }

    }
}