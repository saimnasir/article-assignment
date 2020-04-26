using System;

namespace ArticleAssignment.ViewModels
{
    public class Author : ViewModel
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string About { get; set; }
    }

}
