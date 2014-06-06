using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GameObserver.DomainModel;
using GameObserver.DomainModel.Entities;

namespace GameObserver.Data
{
    public class RepositoryGameObserver: IRepositoryGameObserver
    {

        private static String Stringconn = ConfigurationManager.ConnectionStrings["GameObserverConn"].ConnectionString;


        public IEnumerable<Actor> GetPlayers(String sub)
        {
            IEnumerable<Actor> all = GetAllPlayers();
            int i = 0;
            foreach (Actor actor in all)
            {
                if (actor.Name.ToLower().Contains(sub.ToLower()))
                {
                    yield return actor;
                }
                if (i > 9) break;
                ++i;
            }
        } 

        public Club GetClub(int id)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Clube where id=" + id;

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Club()
                            {
                                Id = reader.GetInt32(0),
                                Name = reader.GetString(1),
                                Established = reader.GetDateTime(2),
                                Symbol = reader.GetString(3)
                            };
                        }
                    }
                    return null;
                }

                finally
                {
                    conn.Close();
                }

            }
        }

        public Formation GetFormation(int id)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Formacao where id=" + id;

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Formation()
                            {
                                Id = reader.GetInt32(0),
                                Designation = reader.GetString(1)
                            };
                        }
                    }
                    return null;
                }

                finally
                {
                    conn.Close();
                }

            }
        }

        public IEnumerable<Club> GetAllClubs()
        {
            
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Clube";

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            yield return new Club()
                            {
                                Id = reader.GetInt32(0),
                                Name = reader.GetString(1),
                                Established = reader.GetDateTime(2),
                                Symbol = reader.GetString(3)
                            };
                        }
                    }
                }
                
                finally
                {
                    conn.Close();
                }

            }
            
        }

        public IEnumerable<Formation> GetAllFormations()
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Formacao";

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            yield return new Formation()
                            {
                                Id = reader.GetInt32(0),
                                Designation = reader.GetString(1)
                            };
                        }
                    }
                }
                finally
                {
                    conn.Close();
                }

            }
        }

        public void CreateTeam(Team team)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = new SqlCommand("inserirEquipa",conn);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter p1 = new SqlParameter("@idformacao", SqlDbType.Int, 4);
                p1.Value = team.IdFormation;
                p1.Direction = ParameterDirection.Input;

                SqlParameter p2 = new SqlParameter("@idclube", SqlDbType.Int, 4);
                p2.Value = team.IdClub;
                p2.Direction = ParameterDirection.Input;

                SqlParameter p3 = new SqlParameter("@date", SqlDbType.Date, 8);
                p3.Value = team.Data;
                p3.Direction = ParameterDirection.Input;
                
                cmd.Parameters.Add(p1);
                cmd.Parameters.Add(p2);
                cmd.Parameters.Add(p3);
                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                finally
                {
                    conn.Close();
                }
            }
        }

        public void InsertPlayersOnTeam(Team team, Player player, bool onfield)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = new SqlCommand("inserirJogadorNaEquipa", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter p1 = new SqlParameter("@idjogador", SqlDbType.Int, 4);
                p1.Value = player.Id;
                p1.Direction = ParameterDirection.Input;

                SqlParameter p2 = new SqlParameter("@idclube", SqlDbType.Int, 4);
                p2.Value = team.IdClub;
                p2.Direction = ParameterDirection.Input;

                SqlParameter p3 = new SqlParameter("@dataequipa", SqlDbType.Date, 8);
                p3.Value = team.Data;
                p3.Direction = ParameterDirection.Input;

                SqlParameter p4 = new SqlParameter("@emcampo", SqlDbType.Int, 4);
                p4.Value = onfield;
                p4.Direction = ParameterDirection.Input;

                cmd.Parameters.Add(p1);
                cmd.Parameters.Add(p2);
                cmd.Parameters.Add(p3);
                cmd.Parameters.Add(p4);
                try
                {
                    conn.Open();
                    cmd.ExecuteNonQuery();
                }
                finally
                {
                    conn.Close();
                }
            }
        }

        public IEnumerable<Stadium> GetAllStadiums()
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Estadio";

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            yield return new Stadium()
                            {
                                Id = reader.GetInt32(0),
                                Name = reader.GetString(1),
                                Morada = reader.GetString(2),
                                Capacity = reader.GetInt32(3)
                            };
                        }
                    }
                }

                finally
                {
                    conn.Close();
                }

            }
        }

        public IEnumerable<Actor> GetAllReferees()
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Actor where Arbitro=1";

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            
                            yield return new Actor()
                            {
                                Id = reader.GetInt32(0),
                                Name = reader.GetString(1),
                                Born = reader.GetDateTime(2),
                                Height = reader.GetDecimal(3),
                                Photo = reader.GetString(4),
                                Weight = reader.GetInt32(5),
                                Referee = reader.GetInt32(6),
                                Player = reader.GetInt32(7)
                            };
                        }
                    }
                }

                finally
                {
                    conn.Close();
                }

            }
        }


        public IEnumerable<Actor> GetAllPlayers()
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Actor where Jogador=1";

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            yield return new Actor()
                            {
                                Id = reader.GetInt32(0),
                                Name = reader.GetString(1),
                                Born = reader.GetDateTime(2),
                                Height = reader.GetDecimal(3),
                                Photo = reader.GetString(4),
                                Weight = reader.GetInt32(5),
                                Referee = reader.GetInt32(6),
                                Player = reader.GetInt32(7)
                            };
                        }
                    }
                }

                finally
                {
                    conn.Close();
                }

            }
        }

        public IEnumerable<Team> GetAllTeams()
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Equipa";

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            yield return new Team()
                            {
                                Data = reader.GetDateTime(0),
                                IdClub = reader.GetInt32(1),
                                IdFormation = reader.GetInt32(2)
                            };
                        }
                    }
                }

                finally
                {
                    conn.Close();
                }

            }
        }


        public Team GetTeam(DateTime date, int idclub)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Equipa where data='"+date+"' and id="+idclub;

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Team()
                            {
                                Data = reader.GetDateTime(0),
                                IdClub = reader.GetInt32(1),
                                IdFormation = reader.GetInt32(2)
                            };
                        }
                    }
                    return null;
                }

                finally
                {
                    conn.Close();
                }

            }
        }



        public IEnumerable<Actor> GetPlayersByTeam(Team team)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select Actor.* from Equipa inner join conter on(Equipa.id=conter.idclube and Equipa.data=conter.dataequipa) inner join Jogador on(Jogador.id=conter.idjogador)inner join Actor on(Jogador.id=Actor.id) where Equipa.id="+team.IdClub+" and Equipa.data="+team.Data;

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            yield return new Actor()
                            {
                                Id = reader.GetInt32(0),
                                Name = reader.GetString(1),
                                Born = reader.GetDateTime(2),
                                Height = reader.GetDecimal(3),
                                Photo = reader.GetString(4),
                                Weight = reader.GetInt32(5),
                                Referee = reader.GetInt32(6),
                                Player = reader.GetInt32(7)
                            };
                        }
                    }
                }

                finally
                {
                    conn.Close();
                }

            }
        }

        public void CreateMatch(Referee first, Referee second, Referee third, Referee four, Team home, Team away, Stadium stadium,
            DateTime date)
        {
            throw new NotImplementedException();
        }
    }
}
