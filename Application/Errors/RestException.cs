using System;
using System.Net;

namespace Application.Errors
{
    [System.Serializable]
    public class RestException : System.Exception
    {
        public HttpStatusCode Code { get; }
        public object Errors { get; }

        public RestException(HttpStatusCode code, object errors = null){
            Code = code;
            Errors = errors;
        }
    }   
}