using System;
using System.Text;
using System.Threading.Tasks;
using Application.Activities;
using Application.Interfaces;
using Application.Profiles;
using Domain;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistance;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices
            (
                this IServiceCollection services,
                IConfiguration config
            )
        {

            _ = services.AddCors(opt =>
                  {
                      opt.AddPolicy("CorsPolicy", policy =>
                      {
                          policy.AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials()//this will allow signalr to connect when sending the creds
                                .WithExposedHeaders(new string[] { "WWW-Authenticate", "Pagination" })
                                .WithOrigins("http://localhost:3000");
                      });
                  });

            services.AddMediatR(typeof(List.Handler).Assembly);

            services.AddAutoMapper(typeof(List.Handler));

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });

            // var builder = services.AddIdentityCore<AppUser>();
            // var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            // identityBuilder.AddEntityFrameworkStores<DataContext>();
            // identityBuilder.AddSignInManager<SignInManager<AppUser>>();


            //pull out the user secrets and api key : saved via dotnet user-secrets set
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));

            services.AddSignalR();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            Console.WriteLine("Current Execution Envrionment:" + config["Env:This"]);


            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();



            return services;




        }
    }
}