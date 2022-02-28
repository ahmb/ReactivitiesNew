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
                                .WithExposedHeaders("WWW-Authenticate")
                                .WithOrigins("http://localhost:3000");
                      });
                  });

            services.AddMediatR(typeof(List.Handler).Assembly);

            services.AddAutoMapper(typeof(List.Handler));


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
            services.AddScoped<IProfileReader, ProfileReader>();


            // services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
            // {
            //     opt.TokenValidationParameters = new TokenValidationParameters
            //     {
            //         ValidateIssuerSigningKey = true,
            //         IssuerSigningKey = key,
            //         ValidateAudience = false,
            //         ValidateIssuer = false,
            //         ValidateLifetime = true,
            //     };
            //     //hook into the on message recieved for the singalR event
            //     opt.Events = new JwtBearerEvents
            //     {
            //         OnMessageReceived = msgRecvContext =>
            //         {
            //             //will pull the token out of the request
            //             Microsoft.Extensions.Primitives.StringValues accessToken = msgRecvContext.Request.Query["access_token"];
            //             //get a reference to the path of the request thats coming in
            //             Microsoft.AspNetCore.Http.PathString path = msgRecvContext.HttpContext.Request.Path;
            //             if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat")))
            //             {
            //                 msgRecvContext.Token = accessToken;
            //             }
            //             return Task.CompletedTask;
            //         }
            //     };
            // });

            return services;




        }
    }
}