using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace article_assignment
{
    [Obsolete]
    public class Program
    {
        public static int Main(string[] args)
        {
            LoggerConfiguration logConfig = logCongifuration();

            Log.Logger = logConfig.CreateLogger();

            try
            {
                Log.Information("Starting web host");
                CreateHostBuilder(args).Build().Run();
                return 0;
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }


        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .UseSerilog(); // <-- Add this line;

 
        private static LoggerConfiguration logCongifuration()
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var logConfig = new LoggerConfiguration()
                             .Enrich.FromLogContext()
                             .WriteTo.RollingFile(
                                pathFormat: "Logs\\log{Date}.json",
                                outputTemplate: "[{Level:u3}] {Timestamp:yyyy:MM:dd HH:mm:ss} {Message:lj}{NewLine}{Exception}"
                            );


            if (environment == Microsoft.AspNetCore.Hosting.EnvironmentName.Development)
            {
                logConfig.MinimumLevel.Debug();
            }
            else if (environment == Microsoft.AspNetCore.Hosting.EnvironmentName.Staging)
            {
                logConfig.MinimumLevel.Information();
            }
            else if (environment == Microsoft.AspNetCore.Hosting.EnvironmentName.Production)
            {
                logConfig.MinimumLevel.Warning();
            }
            else // as default
            {
                logConfig.MinimumLevel.Warning();
            }

            return logConfig;
        }

    }

}
