using AutoMapper;

namespace ArticleAssignment.API.Map
{
    public class AutoMappingProfile : Profile
    {
        public AutoMappingProfile()
        {
            ViceVersa<DataModels.Article, ViewModels.Article>();
            ViceVersa<DataModels.Author, ViewModels.Author>(); 
        }
        protected virtual void ViceVersa<T1, T2>()
        {
            CreateMap<T1, T2>();
            CreateMap<T2, T1>();
        }

    }
}
