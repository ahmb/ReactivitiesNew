using API.Middleware;
using API.SignalR;
using Application.Activities;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistance;
using Microsoft.OpenApi.Models;
using API.Extensions;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config)
        {
            _config = config;
        }



        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            //add the DbContext as a service so that class libs can use it
            // services.AddDbContext<DataContext>(opt =>
            // {
            //     //for lazy loading
            //     // opt.UseLazyLoadingProxies();
            //     opt.UseSqlite(_config.GetConnectionString("DefaultConnection"));
            // });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            ConfigureServices(services);
        }

        public void ConfigureProductionServices(IServiceCollection services)
        {
            //add the DbContext as a service so that class libs can use it
            // services.AddDbContext<DataContext>(opt =>
            // {
            //     opt.UseNpgsql
            // });
            ConfigureServices(services);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //registers all the validators from the assembly that contains the create class
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(cfg =>
                {
                    cfg.RegisterValidatorsFromAssemblyContaining<Create>();
                });
            //             .AddNewtonsoftJson(options =>
            // options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseMiddleware<ErrorHandlingMiddleware>();

            if (env.IsDevelopment())
            {
                // app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }
            else
            {
                app.Use(async (context, next) =>
                    {
                        context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
                        await next.Invoke();
                    });
            }
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy((opt) => opt.NoReferrer());
            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            app.UseXfo(opt => opt.Deny());
            //app.UseCspReportOnly(opt=> opt...) if you just wanna test it out
            app.UseCspReportOnly(opt => opt
                .BlockAllMixedContent()
                .StyleSources(s => s.Self())
                .FontSources(s => s.Self())
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self())
                .ScriptSources(s => s.Self())
            );

            //enables routing to end points
            app.UseRouting();

            //app.UseHttpsRedirection();
            //looks in the API projects wwwroot folder for index.html file when you connect to httpserver
            app.UseDefaultFiles();
            app.UseStaticFiles();

            if (env.IsDevelopment())
            {
                //in order to accept requests from the react app when its running via npm
                app.UseCors("CorsPolicy");
            }

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
                //fallback controller incase donet is not 
                //aware of what  react-routers doing
                endpoints.MapFallbackToController("Index", "Fallback");

            });
        }
    }
}
