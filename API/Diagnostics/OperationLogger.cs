using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.Text;

namespace API.Diagnostics
{
    public class OperationLogger
    {
        private static Stopwatch operationTimer;
        private readonly ILogger<OperationLogger> logger;
        public OperationLogger(ILogger<OperationLogger> logger)
        {
            this.logger = logger;
        }

        public IDisposable ExecuteRequest(HttpContext context)
        {
            return new RequestScope(logger, context);
        }

        private class RequestScope : IDisposable
        {
            private readonly HttpContext context;
            private readonly ILogger<OperationLogger> logger;
            public RequestScope(ILogger<OperationLogger> logger, HttpContext context)
            {
                this.logger = logger;
                this.context = context;
                operationTimer = new Stopwatch();
                operationTimer.Start();
            }

            public void Dispose()
            {
                var stringBuilder = new StringBuilder();

                if (context.Session != null)
                {
                    ////Log operation
                    //stringBuilder.AppendLine(context.Document.ToString(true));
                    ////Log variables
                    //if (context.Variables != null)
                    //{
                    //    var variablesConcrete = context.Variables!.ToList();
                    //    if (variablesConcrete.Any())
                    //    {
                    //        stringBuilder.AppendLine("Variables");
                    //        try
                    //        {
                    //            foreach (var variableValue in context.Variables!)
                    //            {
                    //                stringBuilder.AppendLine($"  {variableValue.Name} :  {@variableValue.Value.ToString()}: {variableValue.Type}");
                    //            }
                    //        }
                    //        catch
                    //        {
                    //            stringBuilder.AppendLine("  Formatting Variables Error. Continuing...");
                    //        }
                    //    }
                    //}

                    ////Log headers
                    //var httpContext = context.ContextData.FirstOrDefault(x => x.Key == nameof(Microsoft.AspNetCore.Http.HttpContext)).Value as Microsoft.AspNetCore.Http.HttpContext;
                    //if (httpContext != null)
                    //{
                    //    stringBuilder.AppendLine("Headers");
                    //    stringBuilder.AppendLine(httpContext.Request.Headers.Serialize());
                    //}

                    ////Log Result
                    //if (context.Result != null)
                    //{
                    //    stringBuilder.AppendLine($"Result: {context.Result.ToJson()}");
                    //}

                    //operationTimer.Stop();

                    //var operationType = context?.Operation?.Definition?.Operation.ToString();
                    //stringBuilder.AppendLine($"Ellapsed time for {operationType} is {operationTimer.Elapsed.TotalMilliseconds:0.#} milliseconds.");
                    
                    //if (!context.Document.ToString().Contains("introspection", StringComparison.InvariantCultureIgnoreCase))
                    //    logger.LogInformation(stringBuilder.ToString());
                }
            }
        }
    }
}