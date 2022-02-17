using System.Linq;
using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();

            CreateMap<Activity, ActivityDto>()
            .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
            .FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, Profiles.Profile>()
            .ForMember(
                destinationMember => destinationMember.Username, options => options.MapFrom(source => source.AppUser.UserName))
            .ForMember(
                destinationMember => destinationMember.DisplayName, options => options.MapFrom(source => source.AppUser.DisplayName))
            .ForMember(
                d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
            .ForMember(
                d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url)
            );
            //custom value resolver 
            // .ForMember(d => d.Following, o => o.MapFrom<FollowingResolver>());
        }
    }
}