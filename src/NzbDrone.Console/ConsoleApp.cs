﻿using System;
using System.Net.Sockets;
using NLog;
using NzbDrone.Common.EnvironmentInfo;
using NzbDrone.Common.Instrumentation;
using NzbDrone.Host;

namespace NzbDrone.Console
{
    public static class ConsoleApp
    {
        private static readonly Logger Logger = NzbDroneLogger.GetLogger(typeof(ConsoleApp));

        public static void Main(string[] args)
        {
            try
            {
                var startupArgs = new StartupContext(args);
                NzbDroneLogger.Register(startupArgs, false, true);
                Bootstrap.Start(startupArgs, new ConsoleAlerts());
            }
            catch (SocketException exception)
            {
                System.Console.WriteLine("");
                System.Console.WriteLine("");
                Logger.Fatal(exception.Message + ". This can happen if another instance of NzbDrone is already running or another applicaion is using the port assinged to NzbDrone (default: 8989)");
                System.Console.WriteLine("Press any key to exit...");
                System.Console.ReadLine();
                Environment.Exit(1);
            }
            catch (Exception e)
            {
                System.Console.WriteLine("");
                System.Console.WriteLine("");
                Logger.FatalException("EPIC FAIL!", e);
                System.Console.WriteLine("Press any key to exit...");
                System.Console.ReadLine();
                Environment.Exit(1);
            }

            Logger.Info("Exiting main.");

            //Need this to terminate on mono (thanks nlog)
            LogManager.Configuration = null;
            Environment.Exit(0);
        }
    }
}
