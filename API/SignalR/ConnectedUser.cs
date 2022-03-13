using System.Collections.Generic;

namespace API.SignalR
{
    public static class ConnectedUser
    {
        private static Dictionary<string, HashSet<string>> ids = new();

        public static Dictionary<string, HashSet<string>> Ids { get => ids; set => ids = value; }
    }
}