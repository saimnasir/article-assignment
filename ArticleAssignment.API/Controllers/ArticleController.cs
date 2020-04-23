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
        public ActionResult<IEnumerable<ViewModels.Article>> ListAll()
        {
            try
            {
                var dataModels = _repository.ListAll();
                if (dataModels == null || !dataModels.Any())
                {
                    Log.Warning("No Articles were found.");
                    return new JsonResult(new
                    {
                        Message = $"No Articles were found."
                    });
                }
                var viewModels = _mapper.Map<List<ViewModels.Article>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "List All Articles failed.");
                return new JsonResult(new
                {
                    Message = $"List All Articles failed. Error: {ex.Message}"
                });
            }
        }

        // GET: api/Article/5
        [HttpGet]
        [Route("{id}")]
        public ActionResult<ViewModels.Article> Read(long id)
        {
            try
            {
                var dataModel = _repository.Read(id);
                if (dataModel == null)
                {
                    Log.Warning("Article not found. [id:{0}]", id);
                    return new JsonResult(new
                    {
                        Message = $"Article not found. [id:{id}]"
                    });
                }
                var viewModel = _mapper.Map<ViewModels.Article>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Read Article failed. [id:{0}]", id);
                return new JsonResult(new
                {
                    Message = $"Read Article failed. [id:{id}]\n\tError: {ex.Message}"
                });
            }
        }

        // POST: api/Article
        [HttpPost]
        public ActionResult<ViewModels.Article> Create(ViewModels.Article viewModel)
        {
            try
            {
                var author = _authorRepository.Read(viewModel.Author);
                if (author == null)
                {
                    Log.Warning("Create Article failed. Author not found or deleted.", viewModel);
                    return new JsonResult(new
                    {
                        Message = $"Create Article failed. Author not found or deleted. [id:{viewModel.Author}]"
                    });
                }
                var dataModel = _mapper.Map<DataModels.Article>(viewModel);
                dataModel = _repository.Create(dataModel);
                viewModel = _mapper.Map<ViewModels.Article>(dataModel);
                return viewModel;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Create Article failed. [title:{0}]", viewModel.Title);
                return new JsonResult(new
                {
                    Message = $"Create Article failed.[title:{viewModel.Title}]\n\tError: {ex.Message}"
                });
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
                    Log.Warning("Nothing updated. Article not found. Input:\n\t {@viewModel}", viewModel);
                    return new JsonResult(new
                    {
                        Message = $"Nothing updated. Article not found. [id:{viewModel.Id}]"
                    });
                }
                viewModel = _mapper.Map<ViewModels.Article>(dataModel);
                return Ok(viewModel);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Update Article failed. [id:{0}]", viewModel.Id);
                return new JsonResult(new
                {
                    Message = $"Read Article failed.[id:{viewModel.Id}]\n\tError: {ex.Message}"
                });
            }
        }

        // DELETE: api/Article/5
        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            try
            {
                if (!_repository.Delete(id))
                {
                    Log.Warning("Nothing deleted. Article not found. [id:{0}]", id);
                    return new JsonResult(new
                    {
                        Message = $"Nothing deleted. Article not found. [id:{id}]"
                    });
                }

                Log.Warning("Delete Article succeed. [id:{0}]", id);
                return new JsonResult(new
                {
                    Message = $"Delete Article succeed."
                });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Delete Article failed. [id:{0}]", id);
                return new JsonResult(new
                {
                    Message = $"Delete Article failed. [id:{id}]\n\tError: {ex.Message}"
                });
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
                if (dataModels == null || !dataModels.Any())
                {
                    Log.Warning("No Articles were found.");
                    return new JsonResult(new { Message = $"No Articles were found." });
                }
                var viewModels = _mapper.Map<List<ViewModels.Article>>(dataModels);
                return viewModels;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Search Articles failed.");
                return new JsonResult(new
                {
                    Message = $"Search Articles failed. Error: {ex.Message}"
                });
            }
        }

    }
}