using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Gamestats.Entity;

namespace Gamestats.Data
{
    public class SqlGamestatsRepository : Gamestats.DomainModel.IRepositoryGamestats
    {
        private const String _funcinserirGameEvent = "inserirGameEvent";
        private const String _funcupdateGameEvent = "UpdateGameEvent";

        private SqlConnection AcessDb()
        {
            SqlConnection conn = new SqlConnection();
            conn.ConnectionString = "Data Source=(LocalDb)\v11.0;AttachDbFilename=|DataDirectory|\aspnet-Gamestats-20140415010223.mdf;Initial Catalog=aspnet-Gamestats-20140415010223;Integrated Security=True ";//providerName=System.Data.SqlClient";
                //"Server=2c561a59-23ab-4f93-b2a2-a310010e1526.sqlserver.sequelizer.com;Database=db2c561a5923ab4f93b2a2a310010e1526;User ID=qbbzknotjbnefvmn;Password=4aMjMmn7rgNoFoV3oF8kzhySBYyGuesRbVTEC3NzWfNrZuohoM5MYsgUJ4QWVNKm;";
                //"Data Source=BAPTISTA;Initial Catalog=Gamestats;Integrated Security=True";
            conn.Open();
            return conn;
        }

        public IEnumerable<GameEvent> GetEvents(string Acronym)
        {
            throw new NotImplementedException();
        }

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

        public void CreateEvent(GameEvent gameevent)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = new SqlCommand(_funcinserirGameEvent, conn);
            comm.CommandType = CommandType.StoredProcedure;

            SqlParameter p1 = new SqlParameter("@descricao", SqlDbType.VarChar, 50);
            p1.Value = gameevent.Desc;
            p1.Direction = ParameterDirection.Input;

            SqlParameter p2 = new SqlParameter("@acronym" , SqlDbType.VarChar , 50);
            p2.Value = gameevent.Acronym;
            p2.Direction = ParameterDirection.Input;

            comm.Parameters.Add(p1);
            comm.Parameters.Add(p2);

            comm.ExecuteNonQuery();
            conn.Close();
        }

        public void UpdadeEvent(int id)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = new SqlCommand(_funcupdateGameEvent , conn);
            comm.CommandType = CommandType.StoredProcedure;
        }

        public GameEvent GetEvent(int id)
        {
            throw new NotImplementedException();
        }
    }
}
