﻿using System;
using System.Threading;
using System.Threading.Tasks;
using GameObserver.Controllers;

namespace GameObserver.Tests
{
    
    public class SetUpControllerTest
    {

        private static DateTime datenow;
        private static int inc = 0;
        string user = "user";

        public static void Main()
        {

            SetUpControllerTest test = new SetUpControllerTest();
            //controller = new SetUpController();
            test.CallTests();
        }

        public void CallTests()
        {
            //SetUp();

            //TestLoad();

            int maxload = 0;
            int currload = 0;
            TimeSpan currtime = new TimeSpan(0);
            TimeSpan mintime = new TimeSpan(0, 0, 1, 0);
            for (int i = 0; i < 50; ++i)
            {
                SetUp();

                if ((currload = TestLoad()) > maxload)
                {
                    maxload = currload;
                }
                DeleteOpinionsByInstant(datenow.ToString("yyyy-MM-dd HH:mm:ss"));
                SetUp();
                if ((currtime = TestPerformance()) < mintime)
                {
                    mintime = currtime;
                }
                DeleteOpinionsByInstant(datenow.ToString("yyyy-MM-dd HH:mm:ss"));
            }
            Console.WriteLine("Teste de carga - maximo de {0} transações em 10 segundos", maxload);
            Console.WriteLine("Teste de performance - {0} para efectuar 2000 transações ", mintime);
            DeleteInstant("2014-05-24 20:00:00.000");
            Console.ReadKey();
        }

        public void SetUp()
        {
            SetUpController controller = new SetUpController();
            datenow = DateTime.Now;
            controller.CreateInstant(datenow.ToString("R") , "1" ,"2014-05-24 20:00:00.000", "2014-05-23", "1",
                        "2014-05-23", "2","8",4,"30","Admin");
        }


        public int TestLoad()
        {
            
            int totalrequests=0;
            DateTime start = DateTime.Now;
            int index = 0;
            DateTime auxdatenow = datenow;
            while ((DateTime.Now - start).TotalMilliseconds < 10*1000)
            {
                //var dt = "2014-08-11 21:00:38.000".Substring(0, 23) + index;
                //var dt = "2014-08-11 22:00:38.000";
                //DateTime s = DateTime.Parse(dt);
                auxdatenow = auxdatenow.AddMilliseconds(10);
                //DateTime d = Convert.ToDateTime(dt);
                //Thread.Sleep(10);    

                totalrequests += CreateOpinionUser(datenow.ToString("yyyy-MM-dd HH:mm:ss"), "1",
                        "2014-05-24 20:00:00.000", "2014-05-23", "1",
                        "2014-05-23", "2", "user", auxdatenow.ToString("yyyy-MM-dd HH:mm:ss.FFFFF"), "yes");

                //Console.WriteLine("Criados {0} opinões ", totalrequests);
            }

            Console.WriteLine("Criados {0} opinões em 10 segundos ", totalrequests);
            return totalrequests;
        }




        
        
        public TimeSpan TestPerformance()
        {
            const int totalopinionsPerUser = 10;
            const int totalusers = 200;
            int nusers = 0;
            //const string user = "user";
            user =+ inc++ +"";
            DateTime start = DateTime.Now;
            DateTime auxdatenow = datenow;

            //auxdatenow = auxdatenow.AddHours(1);

            for (int i = 0; i < totalusers; ++i)
            {
                for (int j = 0; j < totalopinionsPerUser; ++j)
                {
                    //var dt = "2014-08-11 21:00:38.000";
                    //DateTime s = DateTime.Parse(dt);
                    auxdatenow = auxdatenow.AddMilliseconds(10);
                    //DateTime d = Convert.ToDateTime(dt);
                    nusers += CreateOpinionUser(datenow.ToString("yyyy-MM-dd HH:mm:ss"), "1",
                        "2014-05-24 20:00:00.000", "2014-05-23", "1",
                        "2014-05-23", "2", user, auxdatenow.ToString("yyyy-MM-dd HH:mm:ss.FFFFF"), "yes");

                    if (nusers == totalopinionsPerUser*totalusers)
                    {
                        TimeSpan end = DateTime.Now - start;
                        Console.WriteLine("OK - Criar {0} opinões por {1} utilizadores demora - {2}",totalopinionsPerUser,totalusers, DateTime.Now-start);
                        return end;
                    }
                }
                
            }
            return new TimeSpan(0);
        }
        
        public int CreateOpinionUser(String dataopinion, String neg, String hour, String hourvisitor,
            String idvisitor, String houragainst, String idagainst, String username, String houtopinion, String opinion)
        {
            SetUpController controller = new SetUpController();
            controller.CreateOpinionUser(dataopinion, neg, hour, hourvisitor,
             idvisitor, houragainst, idagainst, username, houtopinion, opinion);
            return 1;
        }

        public void DeleteOpinionsByInstant(String datetime)
        {
            SetUpController controller = new SetUpController();
            controller.DeleteOpinionsByInstant(datetime);
        }

        public void DeleteInstant(String datetime)
        {
            SetUpController controller = new SetUpController();
            controller.DeleteInstant(datetime);
        }
    }
}
