using System.Collections.Generic;
using ArticleAssignment.Repositories;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Serilog;
using System;
using ArticleAssignment.ViewModels;
using ArticleAssignment.Core;
using System.Linq;

namespace ArticleAssignment.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly IRepositoryFactory _repositoryFactory;
        private readonly IMapper _mapper;
        private readonly IErrorText _errorGenerator;
        public SearchController(
           IRepositoryFactory repositoryFactory,
           IMapper mapper,
           IErrorText errorGenerator)
        {
            _repositoryFactory = repositoryFactory;
            _mapper = mapper;
            _errorGenerator = errorGenerator;
        }

        // POST: api/Article/Search
        [HttpPost]
        [Route("Search")]
        public ActionResult<List<Article>> Search(SearchArticleInput input)
        {
            try
            {
                var articles = _repositoryFactory.ArticleRepository.Search(input).ToList();
                var authors = _repositoryFactory.AuthorRepository.Search(input);
                foreach (var author in authors)
                {
                    var articlesOfAuthor = _repositoryFactory.ArticleRepository.Search(new SearchArticleInput { AuthorId = author.Id });
                    foreach(var item in articlesOfAuthor)
                    {
                        if(articles.Any(a => a.Id!= item.Id)){
                            articles.Add(item);
                        }
                    }
                } 

                var viewModels = _mapper.Map<List<Article>>(articles);
                viewModels.ForEach(viewModel =>
                {
                    getArticleDetails(viewModel);
                });
                return viewModels;
            }
            catch (Exception ex)
            {
                var messageResponse = _errorGenerator.GetMessageResponse<Article, SearchArticleInput>(ActionType.List, input, ex);
                Log.Error(messageResponse.LogTemplate, messageResponse.Message, input);
                throw new Exception(messageResponse.Message);
            }
        }

        private void getArticleDetails(Article article)
        {
            readAuthor(article);

            readCategory(article);

            listComments(article);

            listTags(article);

            readState(article);
        }

        private void readAuthor(Article article)
        {
            var author = _repositoryFactory.AuthorRepository.Read(article.AuthorId);
            if (author == null)
            {
                throw new Exception(_errorGenerator.GetExceptionResponse<Article, Author>(ActionType.Create));
            }
            article.Author = _mapper.Map<Author>(author);
        }

        private void readCategory(Article article)
        {
            var category = _repositoryFactory.CategoryRepository.Read(article.CategoryId);
            if (category == null)
            {
                throw new Exception(_errorGenerator.GetExceptionResponse<Article, Category>(ActionType.Read));
            }
            article.Category = _mapper.Map<Category>(category);
        }

        private void listComments(Article article)
        {
            var input = new SearchCommentInput
            {
                ArticleId = article.Id
            };
            var comments = _repositoryFactory.CommentRepository.Search(input);
            article.Comments = _mapper.Map<List<Comment>>(comments);
        }

        private void listTags(Article article)
        {
            var input = new SearchTagInput
            {
                ArticleId = article.Id
            };
            var tags = _repositoryFactory.TagRepository.Search(input);
            article.Tags = _mapper.Map<List<Tag>>(tags);
        }

        private void readState(Article article)
        {
            var state = _repositoryFactory.StateRepository.Read((long)article.State);
            if (state == null)
            {
                throw new Exception(_errorGenerator.GetExceptionResponse<Article, State>(ActionType.Read));
            }
            article.Status = state.Name;
        }


    }
}