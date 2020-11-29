using System;
using Domain;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistance;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.Reflection;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args).Build();

            // var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    //get the required datacontext entities
                    var context = services.GetRequiredService<DataContext>();
                    var userManager = services.GetRequiredService<UserManager<AppUser>>();
                    //apply a EF migration to bring the database upto the current version
                    context.Database.Migrate();

                    Seed.SeedData(context, userManager).Wait();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occured during migrations.");
                }
            }
            host.Run();
        }


        public static IHostBuilder BuildWebHost(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
                    {
                        webBuilder
            .UseKestrel(x => x.AddServerHeader = false)
            .UseStartup<Startup>();
                    })

                .ConfigureAppConfiguration((hostContext, builder) =>
            {
                // Add other providers for JSON, etc.

                if (hostContext.HostingEnvironment.IsDevelopment())
                {
                    var appAssembly = Assembly.Load(new AssemblyName(hostContext.HostingEnvironment.ApplicationName));
                    if (appAssembly != null)
                    {
                        builder.AddUserSecrets(appAssembly, optional: true);
                    }
                    // Console.WriteLine("THIS IS DEV");
                    // builder.AddUserSecrets<Program>()
                    // AddUserSecrets<Program>()
                    ;
                }
            });
        // .Build();

        // public static IHostBuilder CreateHostBuilder(string[] args) =>
        //     Host.CreateDefaultBuilder(args)
        //         .ConfigureWebHostDefaults(webBuilder =>
        //         {
        //             webBuilder.UseStartup<Startup>();
        //         });
    }
}
