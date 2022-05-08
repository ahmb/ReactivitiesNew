using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Persistance;

namespace Persistance
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            //Create categories
            // if (!context.Categories.Any())
            // {
            //     var categoriesList = new List<Categories>
            //         {
            //             new Categories {
            //                 Name = "coding",
            //                 Description="Programming, IT, SysAdmin, InfoSec, DevOps, Cloud, AI"
            //             },
            //             new Categories {
            //                 Name = "artdesign",
            //                 Description="Paint, Sketch, Draw anime, Photoshop, Illustraor, Figma, Web & App"
            //             },
            //             new Categories {
            //                 Name = "videogames",
            //                 Description="Coordinate an online game or match making, Discussion"
            //             },
            //             new Categories {
            //                 Name = "watch",
            //                 Description="Watch movies, tv-shows or youtube videos of any genre - action/adventure, cooking, anime, scifi, horror, foriegn"
            //             },
            //             new Categories {
            //                 Name = "business",
            //                 Description="Discuss and create business plans, ideas, start-up growth hacking, all about the $"
            //             },
            //             new Categories {
            //                 Name = "study",
            //                 Description="Time to crack open the books, find help with homework assignments, research, or just a plain ol' quiet study sesh"
            //             },
            //             new Categories {
            //                 Name = "misc",
            //                 Description="Surprise us! Lets keep it PG13 though"
            //             },
            //         };

            //     await context.Categories.AddRangeAsync(categoriesList);
            //     await context.SaveChangesAsync();
            // }

            //Create test users and activities
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var categoriesList = new List<Categories>
                    {
                        new Categories {
                            Name = "coding",
                            Description="Programming, IT, SysAdmin, InfoSec, DevOps, Cloud, AI"
                        },
                        new Categories {
                            Name = "artdesign",
                            Description="Paint, Sketch, Draw anime, Photoshop, Illustraor, Figma, Web & App"
                        },
                        new Categories {
                            Name = "videogames",
                            Description="Coordinate an online game or match making, Discussion"
                        },
                        new Categories {
                            Name = "watch",
                            Description="Watch movies, tv-shows or youtube videos of any genre - crime, action/adventure, cooking, anime, scifi, horror, foriegn"
                        },
                        new Categories {
                            Name = "business",
                            Description="Discuss and create business plans, ideas, start-up growth hacking, all about the $"
                        },
                        new Categories {
                            Name = "study",
                            Description="Time to crack open the books, find help with homework assignments, research, or just a plain ol' quiet study sesh"
                        },
                        new Categories {
                            Name = "misc",
                            Description="Surprise us! Lets keep it PG13 though"
                        },
                    };

                await context.Categories.AddRangeAsync(categoriesList);
                // await context.SaveChangesAsync();

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago <- just videogames",
                        Category = "videogames",
                        Categories = new List<ActivityCategories>{
                            new ActivityCategories{
                                Categories  = categoriesList[2]//context.Categories.FirstOrDefault(c =>c.Name =="videogames")
                            }
                        },
                        City = "London",
                        Venue = "Pub",
                        AttendeeCountMax = 3,
                        ChatPassword = Guid.NewGuid(),
                        LastUpdated = DateTime.UtcNow,
                        InPerson = false,
                        Published = true,
                        Private = false,
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        },
                        Tag = new List<ActivityTag>{
                            new ActivityTag{
                                Tag = new Tag{
                                    Name ="sonicthehdedgehog"
                            }
                        }}
                    },
                    new Activity
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago <- watch + videogames",
                        Category = "watch",
                        Categories = new List<ActivityCategories>{
                            new ActivityCategories{
                                Categories  = categoriesList[2]//context.Categories.FirstOrDefault(c =>c.Name =="videogames")
                            },
                            new ActivityCategories{
                                Categories  = categoriesList[3]//context.Categories.FirstOrDefault(c =>c.Name =="watch")
                            }
                        },
                        City = "Paris",
                        Venue = "The Louvre",
                        AttendeeCountMax = 2,
                        ChatPassword = Guid.NewGuid(),
                        LastUpdated = DateTime.UtcNow,
                        InPerson = false,
                        Published = true,
                        Private = false,
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true,
                                ApprovalStatus = ApprovalStatus.Accepted
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                        },
                        Tag = new List<ActivityTag>{
                            new ActivityTag{
                                Tag = new Tag{
                                    Name ="youtube"
                            }
                        }}

                    },
                    new Activity
                    {
                        Title = "Future Activity 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 month in future <-- business",
                        Category = "business",
                        Categories = new List<ActivityCategories>{
                            new ActivityCategories{
                                Categories  = categoriesList[4]//context.Categories.FirstOrDefault(c =>c.Name =="business")//categoriesList[4]
                            }
                        },
                        City = "London",
                        Venue = "Wembly Stadium",
                        AttendeeCountMax = 2,
                        ChatPassword = Guid.NewGuid(),
                        LastUpdated = DateTime.UtcNow,
                        InPerson = false,
                        Published = true,
                        Private = false,
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                        },
                        Tag = new List<ActivityTag>{
                            new ActivityTag{
                                Tag = new Tag{
                                    Name ="startupideas"
                            }
                        }}
                    },
                    new Activity
                    {
                        Title = "Future Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future <-- study + misc",
                        Category = "study",
                        Categories = new List<ActivityCategories>{
                            new ActivityCategories{
                                Categories  = categoriesList[5]//context.Categories.FirstOrDefault(c =>c.Name =="study")//categoriesList[5]
                            },
                            new ActivityCategories{
                                Categories  = categoriesList[6]//context.Categories.FirstOrDefault(c =>c.Name =="misc")//categoriesList[6]
                            }
                        },
                        City = "London",
                        Venue = "Jamies Italian",
                        AttendeeCountMax = 2,
                        ChatPassword = Guid.NewGuid(),
                        LastUpdated = DateTime.UtcNow,
                        InPerson = false,
                        Published = true,
                        Private = false,
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true,
                                ApprovalStatus = ApprovalStatus.Accepted
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false,
                                ApprovalStatus = ApprovalStatus.Accepted
                            },
                        },
                        Tag = new List<ActivityTag>{
                            new ActivityTag{
                                Tag = new Tag{
                                    Name ="Homework"
                            }
                        }}
                    },
                    new Activity
                    {
                        Title = "Future Activity 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future<--- coding",
                        Category = "coding",
                        Categories = new List<ActivityCategories>{
                            new ActivityCategories{
                                Categories  = categoriesList[0]//context.Categories.FirstOrDefault(c =>c.Name =="coding")//categoriesList[0]
                            }
                        },
                        City = "London",
                        Venue = "Pub",
                        AttendeeCountMax = 3,
                        ChatPassword = Guid.NewGuid(),
                        LastUpdated = DateTime.UtcNow,
                        InPerson = false,
                        Published = true,
                        Private = false,
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = false,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                        },
                        Tag = new List<ActivityTag>{
                            new ActivityTag{
                                Tag = new Tag{
                                    Name ="C#"
                            }
                        }}
                    },
                    new Activity
                    {
                        Title = "Future Activity 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future<---artdesign + misc",
                        Category = "artdesign",
                        Categories = new List<ActivityCategories>{
                            new ActivityCategories{
                                Categories  = categoriesList[1]//context.Categories.FirstOrDefault(c =>c.Name =="msc")//categoriesList[1]
                            },
                            new ActivityCategories{
                                Categories  = categoriesList[6]//context.Categories.FirstOrDefault(c =>c.Name =="artdesign")//categoriesList[6]
                            }
                        },
                        City = "London",
                        Venue = "British Museum",
                        AttendeeCountMax = 3,
                        ChatPassword = Guid.NewGuid(),
                        LastUpdated = DateTime.UtcNow,
                        InPerson = false,
                        Published = true,
                        Private = false,
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true,
                                ApprovalStatus = ApprovalStatus.Accepted

                            }
                        },
                        Tag = new List<ActivityTag>{
                            new ActivityTag{
                                Tag = new Tag{
                                    Name ="figma"
                            }
                        }}
                    },
                    new Activity
                    {
                        Title = "Future Activity 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future <---art design",
                        Category = "artdesign",
                        Categories = new List<ActivityCategories>{
                            new ActivityCategories{
                                Categories  = categoriesList[1]//context.Categories.FirstOrDefault(c =>c.Name =="artdesign")//categoriesList[1]
                            }
                        },
                        City = "London",
                        Venue = "Punch and Judy",
                        AttendeeCountMax = 2,
                        ChatPassword = Guid.NewGuid(),
                        LastUpdated = DateTime.UtcNow,
                        InPerson = false,
                        Published = true,
                        Private = false,
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                        },
                        Tag = new List<ActivityTag>{
                            new ActivityTag{
                                Tag = new Tag{
                                    Name ="illustrator"
                            }
                        }}
                    },
                    new Activity
                    {
                        Title = "Future Activity 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future <--coding",
                        Category = "coding",
                        Categories = new List<ActivityCategories>{
                            new ActivityCategories{
                                Categories  = categoriesList[0]//context.Categories.FirstOrDefault(c =>c.Name =="coding")//categoriesList[0]
                            }
                        },
                        City = "London",
                        Venue = "O2 Arena",
                        AttendeeCountMax = 3,
                        ChatPassword = Guid.NewGuid(),
                        LastUpdated = DateTime.UtcNow,
                        InPerson = false,
                        Published = true,
                        Private = false,
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 7 months in future<-misc",
                        Category = "misc",
                          Categories = new List<ActivityCategories>{
                            new ActivityCategories{
                                Categories  = categoriesList[6]//context.Categories.FirstOrDefault(c =>c.Name =="misc")//categoriesList[6]
                            }
                        },
                        City = "Berlin",
                        Venue = "All",
                        AttendeeCountMax = 4,
                        ChatPassword = Guid.NewGuid(),
                        LastUpdated = DateTime.UtcNow,
                        InPerson = false,
                        Published = true,
                        Private = false,
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                        },
                        Tag = new List<ActivityTag>{
                            new ActivityTag{
                                Tag = new Tag{
                                    Name ="cooking"
                            }
                        }}
                    },
                    new Activity
                    {
                        Title = "Future Activity 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "study",
                        Categories = new List<ActivityCategories>{
                            new ActivityCategories{
                                Categories  = categoriesList[5]//context.Categories.FirstOrDefault(c =>c.Name =="study")//categoriesList[5]
                            }
                        },
                        City = "London",
                        Venue = "Pub",
                        AttendeeCountMax = 4,
                        ChatPassword = Guid.NewGuid(),
                        LastUpdated = DateTime.UtcNow,
                        InPerson = false,
                        Published = true,
                        Private = false,
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false,
                                ApprovalStatus = ApprovalStatus.Accepted

                            },
                        },
                        Tag = new List<ActivityTag>{
                            new ActivityTag{
                                Tag = new Tag{
                                    Name ="grade9science"
                            }
                        }}
                    }
                };
                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}