using Arpick.Model;
using System.Collections.Concurrent;

namespace Arpick.DataService
{
    public class ShareDb
    {
        private readonly ConcurrentDictionary<string, UserConnection> _connections = new();
        public ConcurrentDictionary<string, UserConnection> connections => _connections;
    }
}
