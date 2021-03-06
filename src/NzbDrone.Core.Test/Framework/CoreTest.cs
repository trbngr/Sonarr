﻿using System.IO;
using NUnit.Framework;
using NzbDrone.Common.Cloud;
using NzbDrone.Common.Http;
using NzbDrone.Test.Common;

namespace NzbDrone.Core.Test.Framework
{
    public abstract class CoreTest : TestBase
    {
        protected string ReadAllText(params string[] path)
        {
            return File.ReadAllText(Path.Combine(path));
        }

        protected void UseRealHttp()
        {
            Mocker.SetConstant<IHttpProvider>(new HttpProvider(TestLogger));
            Mocker.SetConstant<IHttpClient>(new HttpClient(TestLogger));
            Mocker.SetConstant<IDroneServicesRequestBuilder>(new DroneServicesHttpRequestBuilder());
        }
    }

    public abstract class CoreTest<TSubject> : CoreTest where TSubject : class
    {
        private TSubject _subject;

        [SetUp]
        public void CoreTestSetup()
        {
            _subject = null;
        }

        protected TSubject Subject
        {
            get
            {
                if (_subject == null)
                {
                    _subject = Mocker.Resolve<TSubject>();
                }

                return _subject;
            }

        }
    }
}
