using Serilog.Sinks.File.Archive;
using System.IO.Compression;

namespace API.Diagnostics
{
    public class SerilogHooks
    {
        public static ArchiveHooks ArchiveHooks =>
         new(CompressionLevel.Fastest, "/app/logs/appserver/archive");
    }
}