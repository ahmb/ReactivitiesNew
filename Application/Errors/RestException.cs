using System;
using System.Net;

namespace Application.Errors
{
    [System.Serializable]
    public class RestException : System.Exception
    {
        public HttpStatusCode Code { get; }
        public object Error { get; }

        public RestException(HttpStatusCode code, object error = null){
            Code = code;
            Error = error;
        }
    }   
}