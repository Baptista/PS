using System;
using System.IO;
using GameObserver.Controllers;

namespace GameObserver.Tests
{
    
    public class SetUpControllerTest
    {

        private static DateTime datenow;
        private static int inc;
        string user = "user";

        public static void Main()
        {

            SetUpControllerTest test = new SetUpControllerTest();
            //test.CallTests();
            test.SetUp();
            test.TestLoad();
            test.DeleteOpinionsByInstant(datenow.ToString("yyyy-MM-dd HH:mm:ss"));
            test.DeleteInstant("2014-05-24 20:00:00.000");
            
        }

        public void CallTests()
        {
            
            int maxload = 0;
            int currload;
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
            StreamWriter file = new StreamWriter("LogTests.txt");
            int nrequests = 0;
            //int totalrequests=1000*1000*50;
            DateTime auxdatenow = datenow;

            try
            {
                while (true)
                {
                    auxdatenow = auxdatenow.AddMilliseconds(10);

                    DateTime statop = DateTime.Now;

                    nrequests += CreateOpinionUser(datenow.ToString("yyyy-MM-dd HH:mm:ss"), "1",
                        "2014-05-24 20:00:00.000", "2014-05-23", "1",
                        "2014-05-23", "2", "user", auxdatenow.ToString("yyyy-MM-dd HH:mm:ss.FFFFF"), "yes");

                    file.WriteLine("Opinião número {0} demora {1}", nrequests, DateTime.Now - statop);


                }
            }
            finally
            {
                file.Close();
                Console.WriteLine("Concluído ver LogTests.txt");
                //return totalrequests;
            }
        }

        
        public TimeSpan TestPerformance()
        {
            const int totalopinionsPerUser = 10;
            const int totalusers = 200;
            int nusers = 0;
            
            user =+ inc++ +"";
            DateTime start = DateTime.Now;
            DateTime auxdatenow = datenow;

            
            for (int i = 0; i < totalusers; ++i)
            {
                for (int j = 0; j < totalopinionsPerUser; ++j)
                {
                    
                    auxdatenow = auxdatenow.AddMilliseconds(10);
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
