using System.Linq;
using Application.Activities;
using Application.Comments;
using AutoMapper;
using Application.Profiles;
using Application.Categories;
using Domain;
using Application.Tags;

namespace Application.Core
{
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;

            CreateMap<Activity, Activity>();

            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                            .FirstOrDefault(x => x.IsHost).AppUser.UserName))
                .ForMember(ad => ad.AttendeeCount, o => o.MapFrom(a => a.Attendees.Count));

            CreateMap<Activity, ActivityDetailsDto>()
                .ForMember(d => d.HostUsername,
                            o => o.MapFrom(a => a.Attendees
                                    .FirstOrDefault(aa => aa.IsHost).AppUser.UserName))
                .ForMember(ad => ad.AttendeeCount, o => o.MapFrom(a => a.Attendees.Count))
                .ForMember(ad => ad.Categories, o => o.MapFrom(a => a.Categories))
                .ForMember(ad => ad.Tag, o => o.MapFrom(a => a.Tag));


            CreateMap<Activity, ActivityPreviewDetailsDto>()
                .ForMember(ad => ad.HostUsername,
                            o => o.MapFrom(a => a.Attendees
                                    .FirstOrDefault(aa => aa.IsHost).AppUser.UserName))
                .ForMember(ad => ad.AttendeeCount, o => o.MapFrom(a => a.Attendees.Count))
                .ForMember(ad => ad.Categories, o => o.MapFrom(a => a.Categories))
                .ForMember(ad => ad.Tag, o => o.MapFrom(a => a.Tag));


            // CreateMap<AttendeeDto, ActivityAttendee>()
            //     .ForMember(d => d.)

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(
                    destinationMember => destinationMember.Username, options => options.MapFrom(source => source.AppUser.UserName))
                .ForMember(
                    destinationMember => destinationMember.DisplayName, options => options.MapFrom(source => source.AppUser.DisplayName))
                .ForMember(
                    d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following, o => o
                    .MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following, o => o
                    .MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<Comment, CommentDto>()
                .ForMember(dto => dto.Username, opt => opt.MapFrom(comment => comment.Author.UserName))
                .ForMember(dto => dto.DisplayName, opt => opt.MapFrom(comment => comment.Author.DisplayName))
                .ForMember(dto => dto.Image, opt => opt.MapFrom(
                                                            comment => comment.Author
                                                                .Photos
                                                                .FirstOrDefault(
                                                                    photo => photo.IsMain
                                                                    )
                                                                .Url
                                                            ));

            CreateMap<ActivityAttendee, UserActivityDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Activity.Id))
                .ForMember(d => d.Date, o => o.MapFrom(s => s.Activity.Date))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Activity.Title))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Activity.Category))
                .ForMember(d => d.HostUsername, o => o.MapFrom(s =>
                    s.Activity.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName))
                ;




            CreateMap<ActivityCategories, CategoriesDto>()
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Categories.Name))
            .ForMember(d => d.Description, o => o.MapFrom(s => s.Categories.Description));


            CreateMap<ActivityTag, TagDto>()
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Tag.Name));

            //custom value resolver 
            // .ForMember(d => d.Following, o => o.MapFrom<FollowingResolver>());
        }
    }
}