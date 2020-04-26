using AutoMapper;

namespace ArticleAssignment.API.Map
{
    public class AutoMappingProfile : Profile
    {
        public AutoMappingProfile()
        {
            ViceVersa<DataModels.Article, ViewModels.Article>();
            ViceVersa<DataModels.Author, ViewModels.Author>();
            ViceVersa<DataModels.Tag, ViewModels.Tag>();
            ViceVersa<DataModels.State, ViewModels.State>();
            ViceVersa<DataModels.EntityState, ViewModels.EntityState>();
            ViceVersa<DataModels.Comment, ViewModels.Comment>();
            ViceVersa<DataModels.Category, ViewModels.Category>();
        }
        protected virtual void ViceVersa<T1, T2>()
        {
            CreateMap<T1, T2>();
            CreateMap<T2, T1>();
        }
    }
}
