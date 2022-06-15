using Application.Activities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Http;
using Serilog;
using Microsoft.AspNetCore.ResponseCompression;

var configuration = new ConfigurationBuilder()
                // .AddJsonFile("appsettings.json")
                // .AddJsonFile(
                //     $"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT", EnvironmentVariableTarget.Process)}.json",
                //     true)
                //TODO: Update this and fix above for respective env, this is a temp fix
                .AddJsonFile("appsettings.Development.json")
                .AddEnvironmentVariables()
                .Build();

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(configuration)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

//add services to container 
//ConfigureServices();

//registers all the validators from the assembly that contains the create class
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
})
    .AddFluentValidation(cfg =>
    {
        cfg.RegisterValidatorsFromAssemblyContaining<Create>();
    });

builder.Services.AddDbContext<DataContext>(options =>
{
    var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

    string connStr;

    // Depending on if in development or production, use either Heroku-provided
    // connection string, or development connection string from env var.
    if (env == "Development")
    {
        // Use connection string from file.
        connStr = builder.Configuration.GetConnectionString("DefaultConnection");
    }
    else
    {
        // Use connection string provided at runtime by Heroku.
        var connUrl = Environment.GetEnvironmentVariable("HEROKU_POSTGRESQL_MAROON_URL");

        // Parse connection URL to connection string for Npgsql
        connUrl = connUrl.Replace("postgres://", string.Empty);
        var pgUserPass = connUrl.Split("@")[0];//
        var pgHostPortDb = connUrl.Split("@")[1];//

        var pgHostPort = pgHostPortDb.Split("/")[0];
        var pgDb = pgHostPortDb.Split("/")[1];

        var pgUser = pgUserPass.Split(":")[0];//
        var pgPass = pgUserPass.Split(":")[1];//

        var pgHost = pgHostPort.Split(":")[0];
        var pgPort = pgHostPort.Split(":")[1];

        connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb}; SSL Mode=Require; Trust Server Certificate=true";
    }

    Console.WriteLine(connStr);
    // Whether the connection string came from the local development configuration file
    // or from the environment variable from Heroku, use it to set up your DbContext.
    options.UseNpgsql(connStr);
});

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
});


builder.Services.AddResponseCompression(options =>
{
    options.Providers.Add<GzipCompressionProvider>();
    options.EnableForHttps = true;
});


//Configure the http request pipeline

var app = builder.Build();

app.UseMiddleware<ErrorHandlingMiddleware>();


// app.UseXContentTypeOptions();
// app.UseReferrerPolicy(opt => opt.NoReferrer());
// app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
// app.UseXfo(opt => opt.Deny());
// app.UseCsp(opt => opt
//     .BlockAllMixedContent()
//     .StyleSources(s => s.Self().CustomSources(
//         "https://fonts.googleapis.com",
//         "sha256-/epqQuRElKW1Z83z1Sg8Bs2MKi99Nrq41Z3fnS2Nrgk=",
//         "sha256-2aahydUs+he2AO0g7YZuG67RGvfE9VXGbycVgIwMnBI=",
//         "sha256-+oGcdj5BhO6SoiIGYIkPOMYi7d2h2Pp/bkJLBfYL+kk=",
//         "https://www.facebook.com",
//         "sha256-yChqzBduCCi4o4xdbXRXh4U/t1rP4UUUMJt+rB+ylUI="

//     ))
//     .FontSources(s => s.Self().CustomSources(
//         "https://www.facebook.com",
//         "https://fonts.gstatic.com",
//         "data:"
//     ))
//     .FormActions(s => s.Self())
//     .FrameAncestors(s => s.Self())
//     .ImageSources(s => s.Self().CustomSources(
//         "https://res.cloudinary.com",
//         "https://www.facebook.com",
//         "https://platform-lookaside.fbsbx.com",
//         "data:"
//         ))

//TODO: UNCOMMENT BELOW 
// .ScriptSources(s => s.Self()
//     .CustomSources(
//         "sha256-HIgflxNtM43xg36bBIUoPTUuo+CXZ319LsTVRtsZ/VU=",
//         "https://www.facebook.com",
//         "https://connect.facebook.net",
//         "sha256-3x3EykMfFJtFd84iFKuZG0MoGAo5XdRfl3rq3r//ydA=",
//         "sha256-HIgflxNtM43xg36bBIUoPTUuo+CXZ319LsTVRtsZ/VU=",
//         "sha256-XiQ00gnMGrQ6iKIbJuHeNRUolqelnAL72Slo3+LCb6s="
//     ))
// );

if (app.Environment.IsDevelopment())
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

//looks in the API projects wwwroot folder for index.html file when you connect to httpserver
app.UseDefaultFiles();


app.UseStaticFiles();




app.UseDefaultFiles(new DefaultFilesOptions()
{
    FileProvider = new PhysicalFileProvider(
                        Path.Combine(Directory.GetCurrentDirectory(), @"wwwrootchat")),
    RequestPath = new PathString("/chatroom")
});


app.UseStaticFiles(new StaticFileOptions()
{
    FileProvider = new PhysicalFileProvider(
                        Path.Combine(Directory.GetCurrentDirectory(), @"wwwrootchat")),
    RequestPath = new PathString("/chatroom")
});

app.UseResponseCompression();
app.UseAuthentication();
app.UseAuthorization();

//in order to accept requests from the react app when its running via npm
app.UseCors("CorsPolicy");

app.MapControllers();
app.MapHub<ChatHub>("/chat");
//fallback controller incase donet is not 
//aware of what  react-routers doing
app.MapFallbackToController("Index", "Fallback");

//to resolve the following error:
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    Log.Information("Starting Database Migration and Seeding");
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    Log.Fatal(ex, "An error occured during migraiton");
}

try
{
    Log.Information("Starting web host");
    await app.RunAsync();

}
catch (Exception ex)
{
    Log.Fatal(ex, "Host terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
