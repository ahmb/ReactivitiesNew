using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger,
            IHostEnvironment env)
        {
            _env = env;
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            //send the request to the next piece of middleware in the asp pipeline
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex, _logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context,
         Exception ex, ILogger<ErrorHandlingMiddleware> logger)
        {
            // object errors = null;
            context.Response.ContentType = "application/json";

            switch (ex)
            {
                //TODO: remove this legacy implementation
                case RestException restEx:
                    logger.LogError(restEx, "REST ERROR");
                    // errors = restEx.Errors;
                    context.Response.StatusCode = (int)restEx.Code;
                    break;
                case Exception e:
                    logger.LogError("Exception occured: {a} with message {b}", e, e.Message);
                    // errors = string.IsNullOrWhiteSpace(e.Message) ? "Error" : e.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }

            var response = _env.IsDevelopment()
            ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
            : new AppException(context.Response.StatusCode, ex.Message, "Server Error");

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);

        }
    }
}