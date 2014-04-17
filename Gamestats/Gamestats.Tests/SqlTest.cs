using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Gamestats.Entity;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Gamestats.Tests
{
    [TestClass]
    public class SqlTest
    {
        [TestMethod]
        private SqlConnection AcessDb()
        {
            SqlConnection conn = new SqlConnection();
            conn.ConnectionString = "Server=2c561a59-23ab-4f93-b2a2-a310010e1526.sqlserver.sequelizer.com;Database=db2c561a5923ab4f93b2a2a310010e1526;User ID=qbbzknotjbnefvmn;Password=4aMjMmn7rgNoFoV3oF8kzhySBYyGuesRbVTEC3NzWfNrZuohoM5MYsgUJ4QWVNKm;";
                //"Data Source=BAPTISTA;Initial Catalog=Gamestats;Integrated Security=True";
            conn.Open();
            return conn;
        }

        [TestMethod]
        public IEnumerable<GameEvent> GetAllEvents()
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select * from GameEvent";
            List<GameEvent> list = new List<GameEvent>();

            using (SqlDataReader reader = comm.ExecuteReader())
            {
                while (reader.Read())
                {
                    GameEvent geEvent = new GameEvent()
                    {
                        Id = (int)reader.GetValue(0),
                        Desc = reader.GetString(1),
                        Acronym = reader.GetString(2)
                    };
                    list.Add(geEvent);
                }

                reader.Close();
            }
            return list;
        }
    }
}
