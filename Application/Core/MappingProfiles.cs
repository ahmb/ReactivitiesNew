using System.Linq;
using Application.Activities;
using Application.Comments;
using AutoMapper;
using Application.Profiles;
using Application.Categories;
using Domain;
using Application.Tags;
using Application.Messages;
using Application.Interfaces;

namespace Application.Core
{
    public static class MappingExpressionsHelper
    {
        public static IMappingExpression<TSource, TDestination> MapOnlyIfChanged<TSource, TDestination>
        (this IMappingExpression<TSource, TDestination> map)
        {
            map.ForAllMembers(source =>
            {
                source.Condition((sourceObject, destObject, sourceProperty, destProperty) =>
                {

                    if (sourceProperty == null)
                    {
                        return !(destProperty == null);

                    }
                    return !sourceProperty.Equals(destProperty);

                });
            });
            return map;
        }
    }

    public class MappingProfiles : AutoMapper.Profile
    {


        public MappingProfiles()
        {

            string currentUsername = null;


            CreateMap<Activity, Activity>();

            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                            .FirstOrDefault(x => x.IsHost).AppUser.UserName))
                .ForMember(ad => ad.AttendeeCount,
                            o => o.MapFrom(
                                a => a.Attendees.Where(
                                    a => a.ApprovalStatus == ApprovalStatus.Accepted &&
                                    !a.IsHost).Count()
                                ))
                .ForMember(ad => ad.Host, a => a.MapFrom(a => a.Attendees
                    .SingleOrDefault(at => at.IsHost)))
                .ForMember(dest => dest.IsGoing, opt => opt.MapFrom(a =>
                    a.Attendees.SingleOrDefault(at => at.AppUser.UserName == currentUsername) != null));

            CreateMap<Activity, ActivityPendingDto>()
                .ForMember(d => d.HostUsername,
                            o => o.MapFrom(a => a.Attendees
                                    .FirstOrDefault(aa => aa.IsHost).AppUser.UserName))
                .ForMember(ad => ad.AttendeeCount, o => o.MapFrom(a => a.Attendees.Count))
                .ForMember(ad => ad.Attendees, o => o.MapFrom(a => a.Attendees.
                                                    Where(at => at.ApprovalStatus == ApprovalStatus.Pending)));

            CreateMap<Activity, ActivityDetailsDto>()
                .ForMember(d => d.HostUsername,
                            o => o.MapFrom(a => a.Attendees
                                    .FirstOrDefault(aa => aa.IsHost).AppUser.UserName))
                .ForMember(ad => ad.AttendeeCount, o => o.MapFrom(a => a.Attendees.Count))
                .ForMember(ad => ad.Attendees, o => o.MapFrom(a => a.Attendees.
                                                    Where(at => at.ApprovalStatus == ApprovalStatus.Accepted)))
                .ForMember(ad => ad.Host, a => a.MapFrom(a => a.Attendees.SingleOrDefault(at => at.IsHost)));
            // .ForMember(ad => ad.Categories, o => o.MapFrom(a => a.Categories))
            // .ForMember(ad => ad.Tag, o => o.MapFrom(a => a.Tag));


            CreateMap<Activity, ActivityPreviewDetailsDto>()
                .ForMember(ad => ad.HostUsername,
                            o => o.MapFrom(a => a.Attendees
                                    .FirstOrDefault(aa => aa.IsHost).AppUser.UserName))
                .ForMember(ad => ad.AttendeeCount, o => o.MapFrom(a => a.Attendees.Count))
                .ForMember(ad => ad.Host, a => a.MapFrom(a => a.Attendees
                    .SingleOrDefault(at => at.IsHost)));
            // .ForMember(ad => ad.Categories, o => o.MapFrom(a => a.Categories))
            // .ForMember(ad => ad.Tag, o => o.MapFrom(a => a.Tag));


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
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Categories.Name));
            // .ForMember(d => d.CId, o => o.MapFrom(s => s.Categories.Id));


            CreateMap<ActivityTag, TagDto>()
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Tag.Name));


            CreateMap<ThreadParticipant, ThreadParticipantDto>()
            .ForMember(d => d.Id, o => o.MapFrom(tp => tp.AppUserId))
            .ForMember(d => d.DisplayName, o => o.MapFrom(tp => tp.User.DisplayName))
            .ForMember(d => d.Username, o => o.MapFrom(tp => tp.User.UserName))
            .ForMember(d => d.Image, o => o.MapFrom(tp => tp.User.Photos
                                                                .FirstOrDefault(
                                                                    photo => photo.IsMain
                                                                    )
                                                                .Url));

            CreateMap<Thread, ThreadDto>()
            .ForMember(d => d.Id, o => o.MapFrom(t => t.Id))
            .ForMember(d => d.Contacts, o => o.MapFrom(t => t.Participants))
            // // .ForMember(d => d.Contacts, o => o.MapFrom((src, dest, destMember, context) =>
            // t.Participants.Where(tp => tp.User.UserName != currentUsername)
            .ForMember(d => d.LatestMessage, o => o.MapFrom(t => t.Messages
                                                    .OrderByDescending(m => m.CreatedAt)
                                                    .First()
                                                    ));


            CreateMap<Message, MessageDto>()
            .ForMember(d => d.Id, o => o.MapFrom(m => m.Id))
            .ForMember(d => d.Body, o => o.MapFrom(m => m.Body))
            .ForMember(d => d.CreatedAt, o => o.MapFrom(m => m.CreatedAt))
            .ForMember(d => d.Username, o => o.MapFrom(m => m.Author.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(m => m.Author.DisplayName))
            .ForMember(d => d.Image, o => o.MapFrom(m => m.Author.Photos
                                                                .FirstOrDefault(
                                                                    photo => photo.IsMain
                                                                    )
                                                                .Url));

            CreateMap<ActivityDetailsDto, Activity>()
            .ForMember(d => d.Attendees, o => o.Ignore())
            .ForMember(d => d.Comments, o => o.Ignore())
            .ForMember(d => d.Categories, o => o.Ignore())
            .ForMember(d => d.Tag, o => o.Ignore())
            .ForMember(d => d.ImageUrl, o => o.Ignore())
            .ForMember(d => d.Picture, o => o.Ignore())
            .MapOnlyIfChanged();

            CreateMap<ActivityDetailsDto, ActivityDto>();








            // .ForMember(d => d.DisplayName, o => o.MapFrom(tp => tp.User.DisplayName))
            // .ForMember(d => d.Username, o => o.MapFrom(tp => tp.User.UserName));

            //custom value resolver 
            // .ForMember(d => d.Following, o => o.MapFrom<F     ollowingResolver>());
        }
    }
}