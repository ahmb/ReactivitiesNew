using Application.Activities;

var builder = WebApplication.CreateBuilder(args);

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

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
});


//Configure the http request pipeline

var app = builder.Build();

app.UseMiddleware<ErrorHandlingMiddleware>();


// app.UseXContentTypeOptions();
// app.UseReferrerPolicy((opt) => opt.NoReferrer());
// app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
// app.UseXfo(opt => opt.Deny());
// //app.UseCspReportOnly(opt=> opt...) if you just wanna test it out
// app.UseCspReportOnly(opt => opt
//     .BlockAllMixedContent()
//     .StyleSources(s => s.Self())
//     .FontSources(s => s.Self())
//     .FormActions(s => s.Self())
//     .FrameAncestors(s => s.Self())
//     .ImageSources(s => s.Self())
//     .ScriptSources(s => s.Self())
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

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        //get the required datacontext entities
        var context = services.GetRequiredService<DataContext>();
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        //apply a EF migration to bring the database upto the current version
        //also creates the database if it does not exist 
        await context.Database.MigrateAsync();
        await Seed.SeedData(context, userManager);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occured during migrations.");
    }
}

await app.RunAsync();