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
        private const String _funcdeleteGameEvent = "DeleteGameEvent";

        private const String _funcinserirGamePlayer = "inserirGamePlayer";
        private const String _funcupdateGamePlayer = "updateGamePlayer";
        private const String _funcdeleteGamePlayer = "DeleteGamePlayer";

        private const String _funcinserirGameSetUp = "inserirGameSetUp";
        private const String _funcupdateGameSetUp = "updateGameSetUp";
        private const String _funcdeleteGameSetUp = "DeleteGameSetUp";

        private SqlConnection AcessDb()
        {
            SqlConnection conn = new SqlConnection();
            conn.ConnectionString =
                //"Server=2c561a59-23ab-4f93-b2a2-a310010e1526.sqlserver.sequelizer.com;Database=db2c561a5923ab4f93b2a2a310010e1526;User ID=qbbzknotjbnefvmn;Password=4aMjMmn7rgNoFoV3oF8kzhySBYyGuesRbVTEC3NzWfNrZuohoM5MYsgUJ4QWVNKm;";
                "Data Source=BAPTISTA;Initial Catalog=Gamestats;Integrated Security=True";
            
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

        public void UpdadeEvent(GameEvent gameEvent)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = new SqlCommand(_funcupdateGameEvent , conn);
            comm.CommandType = CommandType.StoredProcedure;

            SqlParameter p1 = new SqlParameter("@id", SqlDbType.Int, 50);
            p1.Direction = ParameterDirection.Input;
            p1.Value = gameEvent.Desc;

            SqlParameter p2 = new SqlParameter("@descricao" , SqlDbType.VarChar,50);
            p2.Direction = ParameterDirection.Input;
            p2.Value = gameEvent.Desc;

            SqlParameter p3 = new SqlParameter("@acronym", SqlDbType.VarChar, 50);
            p3.Value = gameEvent.Acronym;
            p3.Direction = ParameterDirection.Input;

            comm.Parameters.Add(p1);
            comm.Parameters.Add(p2);
            comm.Parameters.Add(p3);

            comm.ExecuteNonQuery();
            conn.Close();
        }

        public GameEvent GetEvent(int id)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select * from GameEvent where id="+id;
            
            using (SqlDataReader reader = comm.ExecuteReader())
            {
                while (reader.Read())
                {

                    return new GameEvent()
                    {

                        Id = (int)reader.GetValue(0),
                        Desc = reader.GetString(1),
                        Acronym = reader.GetString(2)
                    };
                    
                }

                reader.Close();
            }
            return null;
        }

        public void DeleteEvent(int id)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = new SqlCommand(_funcdeleteGameEvent, conn);
            comm.CommandType = CommandType.StoredProcedure;

            SqlParameter p1 = new SqlParameter("@id", SqlDbType.Int, 50);
            p1.Value = id;
            p1.Direction = ParameterDirection.Input;

            comm.Parameters.Add(p1);
            comm.ExecuteNonQuery();
            conn.Close();
        }

        public void CreatePlayer(GamePlayer gamePlayer)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = new SqlCommand(_funcinserirGamePlayer, conn);
            comm.CommandType = CommandType.StoredProcedure;

            SqlParameter p1 = new SqlParameter("@name", SqlDbType.VarChar, 50);
            p1.Value = gamePlayer.Name;
            p1.Direction = ParameterDirection.Input;

            SqlParameter p2 = new SqlParameter("@img", SqlDbType.VarChar, 500);
            p2.Value = gamePlayer.Img;
            p2.Direction = ParameterDirection.Input;

            SqlParameter p3 = new SqlParameter("@acronym", SqlDbType.VarChar , 50);
            p3.Value = gamePlayer.Position;
            p3.Direction = ParameterDirection.Input;

            SqlParameter p4 = new SqlParameter("@team" , SqlDbType.VarChar , 100);
            p4.Value = gamePlayer.Club;
            p4.Direction  = ParameterDirection.Input;

            comm.Parameters.Add(p1);
            comm.Parameters.Add(p2);
            comm.Parameters.Add(p3);
            comm.Parameters.Add(p4);

            comm.ExecuteNonQuery();
            conn.Close();
        }

        public void UpdatePlayer(GamePlayer gamePlayer)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = new SqlCommand(_funcupdateGamePlayer, conn);
            comm.CommandType = CommandType.StoredProcedure;

            SqlParameter p1 = new SqlParameter("@id", SqlDbType.Int , 50);
            p1.Value = gamePlayer.Id;
            p1.Direction = ParameterDirection.Input;

            SqlParameter p2 = new SqlParameter("@name", SqlDbType.VarChar, 50);
            p2.Value = gamePlayer.Name;
            p2.Direction = ParameterDirection.Input;

            SqlParameter p3 = new SqlParameter("@img", SqlDbType.Image, 500000);
            p3.Value = gamePlayer.Img;
            p3.Direction = ParameterDirection.Input;

            SqlParameter p4 = new SqlParameter("@acronym", SqlDbType.VarChar, 50);
            p4.Value = gamePlayer.Position;
            p4.Direction = ParameterDirection.Input;

            SqlParameter p5 = new SqlParameter("@team", SqlDbType.VarChar, 100);
            p5.Value = gamePlayer.Club;
            p5.Direction = ParameterDirection.Input;

            comm.Parameters.Add(p1);
            comm.Parameters.Add(p2);
            comm.Parameters.Add(p3);
            comm.Parameters.Add(p4);
            comm.Parameters.Add(p5);

            comm.ExecuteNonQuery();
            conn.Close();
        }

        public GamePlayer GetPlayer(int id)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select * from GamePlayer where id=" + id;
            
            using (SqlDataReader reader = comm.ExecuteReader())
            {
                while (reader.Read())
                {
                    return new GamePlayer()
                    {
                        Id = (int)reader.GetValue(0),
                        Name = reader.GetString(1),
                        Img = (string)reader[2],
                        Club = reader.GetString(3),
                        Position = reader.GetString(4),
                        //Born = (DateTime)reader[5],
                        Nationality = reader.GetString(6),
                        Titles = reader.GetString(7),
                        Facebook = reader.GetString(8),
                        Height = reader.GetFloat(9),
                        Weight = reader.GetInt32(10)
                    };

                }

                reader.Close();
            }
            return null;
        }

        public IEnumerable<GamePlayer> GetAllPlayers()
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select * from GamePlayer";
            List<GamePlayer> list = new List<GamePlayer>();

            using (SqlDataReader reader = comm.ExecuteReader())
            {

                while (reader.Read())
                {

                    GamePlayer geEvent = new GamePlayer()
                    {

                        Id = (int)reader.GetValue(0),
                        Name = reader.GetString(1),
                        Img = (string)reader[2],
                        Club = reader.GetString(3),
                        Position = reader.GetString(4),
                        Born = (DateTime)reader[5],
                        Nationality = reader.GetString(6),
                        Titles = reader.GetString(7),
                        Facebook = reader.GetString(8),
                        Height = reader.GetFloat(9),
                        Weight = reader.GetInt32(10)
                    };
                    list.Add(geEvent);
                }

                reader.Close();
            }
            return list;
        }

        public void DeletePlayer(int id)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = new SqlCommand(_funcdeleteGamePlayer, conn);
            comm.CommandType = CommandType.StoredProcedure;

            SqlParameter p1 = new SqlParameter("@id", SqlDbType.Int, 50);
            p1.Value = id;
            p1.Direction = ParameterDirection.Input;

            comm.Parameters.Add(p1);

            comm.ExecuteNonQuery();
            conn.Close();
        }

        public IEnumerable<GamePlayer> GetAllPlayers(string club , string position)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select * from GamePlayer where club='"+club+"' and position='"+position+"'";
            List<GamePlayer> list = new List<GamePlayer>();

            using (SqlDataReader reader = comm.ExecuteReader())
            {

                while (reader.Read())
                {
                    
                    GamePlayer geEvent = new GamePlayer()
                    {

                        Id = (int)reader.GetValue(0),
                        Name = reader.GetString(1),
                        Img = (string)reader[2],
                        Club = reader.GetString(3),
                        Position = reader.GetString(4),
                        Born = (DateTime)reader[5],
                        Nationality = reader.GetString(6),
                        Titles = reader.GetString(7),
                        Facebook = reader.GetString(8),
                        Height = reader.GetDouble(9),
                        Weight = (int)reader[10]
                    };
                    list.Add(geEvent);
                }

                reader.Close();
            }
            return list;
        }

        public void CreateGameSetUp(GameSetUp gameSetUp)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = new SqlCommand(_funcinserirGameSetUp, conn);
            comm.CommandType = CommandType.StoredProcedure;

            SqlParameter p1 = new SqlParameter("@stadium", SqlDbType.VarChar, 50);
            p1.Value = gameSetUp.stadium;
            p1.Direction = ParameterDirection.Input;

            SqlParameter p2 = new SqlParameter("@formation", SqlDbType.VarChar, 50);
            p2.Value = gameSetUp.formation;
            p2.Direction = ParameterDirection.Input;

            SqlParameter p3 = new SqlParameter("@namehometeam", SqlDbType.VarChar, 50);
            p3.Value = gameSetUp.nameHomeTeam;
            p3.Direction = ParameterDirection.Input;

            SqlParameter p4 = new SqlParameter("@nameawayteam", SqlDbType.VarChar, 50);
            p4.Value = gameSetUp.nameAwayTeam;
            p4.Direction = ParameterDirection.Input;


            comm.Parameters.Add(p1);
            comm.Parameters.Add(p2);
            comm.Parameters.Add(p3);
            comm.Parameters.Add(p4);

            comm.ExecuteNonQuery();
            conn.Close();
        }

        public GameSetUp GetGameSetUp(int id)
        {
           SqlConnection conn = AcessDb();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select * from Game where id=" + id;
            
            using (SqlDataReader reader = comm.ExecuteReader())
            {
                while (reader.Read())
                {
                    return new GameSetUp()
                    {
                        
                        id = (int)reader.GetValue(0),
                        stadium = reader.GetString(1),
                        formation = (string)reader[2],
                        nameHomeTeam = reader.GetString(3),
                        nameAwayTeam = reader.GetString(4)
                    };

                }

                reader.Close();
            }
            return null;
        
        }

        public IEnumerable<GameSetUp> GetAllGameSetUps()
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = conn.CreateCommand();
            comm.CommandText = "select * from Game";
            List<GameSetUp> list = new List<GameSetUp>();

            using (SqlDataReader reader = comm.ExecuteReader())
            {

                while (reader.Read())
                {

                    GameSetUp geEvent = new GameSetUp()
                    {
                        
                        id = (int)reader.GetValue(0),
                        stadium = reader.GetString(1),
                        formation = (string)reader[2],
                        nameHomeTeam = reader.GetString(3),
                        nameAwayTeam = reader.GetString(4)
                    };
                    list.Add(geEvent);
                }

                reader.Close();
            }
            return list;
        }

        public void UpdateSetUp(GameSetUp gameSetUp)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = new SqlCommand(_funcupdateGameSetUp, conn);
            comm.CommandType = CommandType.StoredProcedure;

            SqlParameter p1 = new SqlParameter("@id", SqlDbType.Int, 50);
            p1.Value = gameSetUp.id;
            p1.Direction = ParameterDirection.Input;


            SqlParameter p2 = new SqlParameter("@stadium", SqlDbType.VarChar, 50);
            p2.Value = gameSetUp.stadium;
            p2.Direction = ParameterDirection.Input;

            SqlParameter p3 = new SqlParameter("@formation", SqlDbType.VarChar, 50);
            p3.Value = gameSetUp.formation;
            p3.Direction = ParameterDirection.Input;

            SqlParameter p4 = new SqlParameter("@namehometeam", SqlDbType.VarChar, 50);
            p4.Value = gameSetUp.nameHomeTeam;
            p4.Direction = ParameterDirection.Input;

            SqlParameter p5 = new SqlParameter("@nameawayteam", SqlDbType.VarChar, 50);
            p5.Value = gameSetUp.nameAwayTeam;
            p5.Direction = ParameterDirection.Input;


            comm.Parameters.Add(p1);
            comm.Parameters.Add(p2);
            comm.Parameters.Add(p3);
            comm.Parameters.Add(p4);
            comm.Parameters.Add(p5);

            comm.ExecuteNonQuery();
            conn.Close();
        }

        public void DeleteSetUp(int id)
        {
            SqlConnection conn = AcessDb();
            SqlCommand comm = new SqlCommand(_funcdeleteGameSetUp, conn);
            comm.CommandType = CommandType.StoredProcedure;

            SqlParameter p1 = new SqlParameter("@id", SqlDbType.Int, 50);
            p1.Value = id;
            p1.Direction = ParameterDirection.Input;

            comm.Parameters.Add(p1);

            comm.ExecuteNonQuery();
            conn.Close();
        }
    }
}
