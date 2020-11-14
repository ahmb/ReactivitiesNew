using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Messages
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Msg, MsgDto>()
            .ForMember(
                destinationMember => destinationMember.AppUserUserName, options => options.MapFrom(source => source.AppUser.UserName)
            );
            CreateMap<MsgReadState, MsgReadStateDto>();
            CreateMap<Thread, ThreadDto>();
            CreateMap<ThreadParticipant, ThreadParticipantDto>();


            // CreateMap<UserActivity, AttendeeDto>()
            // .ForMember(
            //     destinationMember => destinationMember.Username, options => options.MapFrom(source => source.AppUser.UserName))
            // .ForMember(
            //     destinationMember => destinationMember.DisplayName, options => options.MapFrom(source => source.AppUser.DisplayName))
            // .ForMember(
            //     d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url)
            // )
            // //custom value resolver 
            // .ForMember(d => d.Following, o => o.MapFrom<FollowingResolver>());
        }


    }
}