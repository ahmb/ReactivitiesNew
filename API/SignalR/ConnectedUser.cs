using System.Collections.Generic;

namespace API.SignalR
{
    public static class ConnectedUser
    {
        public static Dictionary<string,HashSet<string>> Ids = new Dictionary<string,HashSet<string>>();

    }
}