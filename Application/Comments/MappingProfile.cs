using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Comments
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //which source object needs to map to which object, 
            //itll map all properties by name
            //code below provides mapping for remaining fields, which come from Author/AppUser
            CreateMap<Comment, CommentDto>()
            .ForMember(dto => dto.UserName, objMapper => objMapper.MapFrom(comment => comment.Author.UserName))
            .ForMember(dto => dto.DisplayName, objMapper => objMapper.MapFrom(comment => comment.Author.DisplayName))
            .ForMember(dto => dto.Image, objMapper => objMapper.MapFrom(comment => comment.Author.Photos.FirstOrDefault(photo => photo.IsMain).Url));


        }
    }
}