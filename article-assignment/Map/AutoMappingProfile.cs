using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace Article.Assignment.API.Map
{
    public class AutoMappingProfile : Profile
    {
        public AutoMappingProfile()
        {
            ViceVersa<DataModels.Article, ViewModels.Article>();
            CreateMap<DataModels.Author, ViewModels.Author>(); // means you want to map from User to UserDTO
        }
        protected virtual void ViceVersa<T1, T2>()
        {
            CreateMap<T1, T2>();
            CreateMap<T2, T1>();
        }

    }
}
