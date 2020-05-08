using ArticleAssignment.Core.Enums;
using System.Collections.Generic;

namespace ArticleAssignment.ViewModels
{
    public class Article : ViewModel
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public long AuthorId { get; set; }

        public long CategoryId { get; set; }

        public States State { get; set; }

        public Author Author { get; set; }

        public Category Category { get; set; }

        public List<Tag> Tags { get; set; }

        public List<Comment> Comments { get; set; }

        public string Status { get; set; }
    }
}
