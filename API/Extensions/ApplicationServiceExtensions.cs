using System;
using System.Text;
using System.Threading.Tasks;
using Application.Activities;
using Application.Interfaces;
using Application.Profiles;
using Domain;
using Infrastructure.Email;
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
                                .WithOrigins("http://localhost:3000", "https://iwannagoapp.com",
                                 "http://iwannagoapp.com", "https://www.iwannagoapp.com",
                                  "http://www.iwannagoapp.com", "www.iwannagoapp.com", "http://localhost:3000");
                      });
                  });

            services.AddMediatR(typeof(List.Handler).Assembly);

            services.AddAutoMapper(typeof(List.Handler));



            //pull out the user secrets and api key : saved via dotnet user-secrets set
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));

            services.AddSignalR();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddScoped<EmailSender>();

            return services;
        }
    }
}