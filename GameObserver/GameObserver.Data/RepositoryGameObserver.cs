using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using GameObserver.DomainModel;
using GameObserver.DomainModel.Entities;

namespace GameObserver.Data
{
    public class RepositoryGameObserver: IRepositoryGameObserver
    {

        private static String Stringconn = ConfigurationManager.ConnectionStrings["GameObserverConn"].ConnectionString;


        public IEnumerable<Instant> GetInstantByCause(int idstadium, DateTime datehour, int idteamv, DateTime datateamv,
            int idteamg, DateTime datateamg,int idcause)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Instante where causou=@idpla and idestadio=@ids and datahora=@datahora and datavisitante=@datavis and idvisitante=@idvis and datadefronta=@dataaga and iddefronta=@idaga";

                cmd.Parameters.Add("@idpla", SqlDbType.Int).Value = idcause;
                cmd.Parameters.Add("@ids", SqlDbType.Int).Value = idstadium;
                cmd.Parameters.Add("@datahora", SqlDbType.DateTime).Value = datehour.ToString("yyy-MM-dd HH:mm:ss");
                cmd.Parameters.Add("@datavis", SqlDbType.DateTime).Value = datateamv.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idvis", SqlDbType.Int).Value = idteamv;
                cmd.Parameters.Add("@dataaga", SqlDbType.DateTime).Value = datateamg.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idaga", SqlDbType.Int).Value = idteamg;

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            yield return new Instant()
                            {
                                MinuteSeconds = reader.GetDateTime(0),
                                IdStadium = reader.GetInt32(1),
                                DateMatch = reader.GetDateTime(2),
                                DateVisitor = reader.GetDateTime(3),
                                IdVisitor = reader.GetInt32(4),
                                DateAgainst = reader.GetDateTime(5),
                                IdAgainst = reader.GetInt32(6),
                                IdEvent = reader.GetInt32(7),
                                IdUser = reader.GetString(8),
                                IdCause = reader.GetInt32(9),
                                IdExecute = reader.IsDBNull(10) ? (int?)null : reader.GetInt32(10)

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


        public void UpdateIntegrate(int idclub, DateTime date, int idplayer, int idposition)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = new SqlCommand("UpdateJogadorNaEquipa", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter p1 = new SqlParameter("@idjogador", SqlDbType.Int, 4);
                p1.Value = idplayer;
                p1.Direction = ParameterDirection.Input;

                SqlParameter p2 = new SqlParameter("@idclube", SqlDbType.Int, 4);
                p2.Value = idclub;
                p2.Direction = ParameterDirection.Input;

                SqlParameter p3 = new SqlParameter("@dataequipa", SqlDbType.Date, 8);
                p3.Value = date.ToString("yyyy-MM-dd");
                p3.Direction = ParameterDirection.Input;

                SqlParameter p4;
                if (idposition == 0)
                {
                    p4 = new SqlParameter("@idposicao", SqlDbType.Int, 4);
                    p4.Value = DBNull.Value;
                    p4.Direction = ParameterDirection.Input;
                }
                else
                {
                    p4 = new SqlParameter("@idposicao", SqlDbType.Int, 4);
                    p4.Value = idposition;
                    p4.Direction = ParameterDirection.Input;
                }

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


        public IEnumerable<Actor> GetPlayersByClub(int idclub)
        {
            
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select Actor.* from Jogador inner join Actor on(Jogador.id=Actor.id) where idclub= @idc";
                cmd.Parameters.Add("@idc",SqlDbType.Int).Value = idclub;
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


        public Stadium GetStadium(int id)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Estadio where id=@idc";
                cmd.Parameters.Add("@idc", SqlDbType.Int).Value = id;
                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Stadium()
                            {
                                Id = reader.GetInt32(0),
                                Morada = reader.GetString(1),
                                Name = reader.GetString(2),
                                Capacity = reader.GetInt32(3)
                            };
                        }
                        return null;
                    }

                }

                finally
                {
                    conn.Close();
                }
                
            }
        }


        public Player GetPlayerWithClub(int idplayer)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Jogador where id=@idc";
                cmd.Parameters.Add("@idc", SqlDbType.Int).Value = idplayer;
                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Player()
                            {
                                Id = reader.GetInt32(0),
                                IdClub = reader.GetInt32(1)
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

        public Position GetPosition(int id)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Posicao where id=@idc";
                cmd.Parameters.Add("@idc", SqlDbType.Int).Value = id;
                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Position()
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


        public Position GetPlayerPosition(int idplayer)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select Posicao.* from Jogador inner join jogar on(Jogador.id = jogar.idjog) inner join Posicao on(Posicao.id = jogar.idpos) where Jogador.id = @idc";
                cmd.Parameters.Add("@idc", SqlDbType.Int).Value = idplayer;
                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Position()
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


        public IEnumerable<Actor> GetPlayers(String sub)
        {
            //IEnumerable<Actor> all = GetAllPlayers();
            
            int i = 0;
            foreach (Actor actor in GetAllPlayers())
            {
                if (actor.Name.ToLower().Contains(sub.ToLower()))
                {
                    ++i;
                    yield return actor;
                }
                if (i > 9) break;
                
            }
        } 

        public Club GetClub(int id)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Clube where id=@idc";
                cmd.Parameters.Add("@idc", SqlDbType.Int).Value = id;
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
                cmd.CommandText = "select * from Formacao where id=@idc";
                cmd.Parameters.Add("@idc", SqlDbType.Int).Value = id;
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

        public void CreateTeam(int idFormation , int idClub , DateTime date)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = new SqlCommand("InserirEquipa",conn);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter p1 = new SqlParameter("@idformacao", SqlDbType.Int, 4);
                p1.Value = idFormation;
                p1.Direction = ParameterDirection.Input;

                SqlParameter p2 = new SqlParameter("@idclube", SqlDbType.Int, 4);
                p2.Value = idClub;
                p2.Direction = ParameterDirection.Input;

                SqlParameter p3 = new SqlParameter("@date", SqlDbType.Date, 8);
                p3.Value = date;
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

        public void InsertPlayersOnTeam(int idplayer, int idclub,DateTime date, int idpos)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = new SqlCommand("InserirJogadorNaEquipa", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter p1 = new SqlParameter("@idjogador", SqlDbType.Int, 4);
                p1.Value = idplayer;
                p1.Direction = ParameterDirection.Input;

                SqlParameter p2 = new SqlParameter("@idclube", SqlDbType.Int, 4);
                p2.Value = idclub;
                p2.Direction = ParameterDirection.Input;

                SqlParameter p3 = new SqlParameter("@dataequipa", SqlDbType.Date, 8);
                p3.Value = date;
                p3.Direction = ParameterDirection.Input;

                SqlParameter p4;
                if (idpos == 0)
                {
                    p4 = new SqlParameter("@idposicao", SqlDbType.Int, 4);
                    p4.Value = DBNull.Value;
                    p4.Direction = ParameterDirection.Input;
                }
                else
                {
                    p4 = new SqlParameter("@idposicao", SqlDbType.Int, 4);
                    p4.Value = idpos;
                    p4.Direction = ParameterDirection.Input;
                }

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

        public void RemovePlayersOnTeam(int idplayer, int idclub, DateTime date)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = new SqlCommand("RemoverJogadorNaEquipa", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter p1 = new SqlParameter("@idjogador", SqlDbType.Int, 4);
                p1.Value = idplayer;
                p1.Direction = ParameterDirection.Input;

                SqlParameter p2 = new SqlParameter("@idclube", SqlDbType.Int, 4);
                p2.Value = idclub;
                p2.Direction = ParameterDirection.Input;

                SqlParameter p3 = new SqlParameter("@dateequipa", SqlDbType.Date, 8);
                p3.Value = date.Date.ToString("yyyy-MM-dd");
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

        public Actor GetReferee(int id)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Actor where Arbitro=1 and id=@idc";
                cmd.Parameters.Add("@idc", SqlDbType.Int).Value = id;
                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Actor()
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
                        return null;
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


        public Boolean IsPlayer(int id)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                //adicionar Jogador=1
                cmd.CommandText = "select * from Actor inner join Jogador on (Actor.id=Jogador.id) where Actor.id=@idc";
                cmd.Parameters.Add("@idc", SqlDbType.Int).Value = id;
                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            return true;
                        }
                        return false;
                    }
                }

                finally
                {
                    conn.Close();
                }

            }
        }



        public Actor GetActor(int id)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                //adicionar Jogador=1
                cmd.CommandText = "select * from Actor where id=@idc";
                cmd.Parameters.Add("@idc", SqlDbType.Int).Value = id;
                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Actor()
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
                        return null;
                    }
                }

                finally
                {
                    conn.Close();
                }

            }
        }

        public IEnumerable<Event> GetAllEvents()
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Evento";

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            yield return new Event()
                            {
                                Id = reader.GetInt32(0),
                                Icone = (reader.IsDBNull(1))?null:reader.GetString(2),
                                Type = reader.GetString(2)
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
            String data = date.Date.ToString("yyyy-MM-dd");
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Equipa where data=@dt and id=@idc";
                cmd.Parameters.Add("@idc", SqlDbType.Int).Value = idclub;
                cmd.Parameters.Add("@dt", SqlDbType.DateTime).Value = date;
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


        public int GetOpinionByEvent(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, int idevent,
            String negative)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select count(*) from Opiniao inner join Instante on (Instante.datadefronta = Opiniao.datadefronta and Instante.datahora = Opiniao.datahora" +
" and Opiniao.iddefronta = Instante.iddefronta and Opiniao.datavisitante = Instante.datavisitante and Opiniao.idvisitante=Instante.idvisitante" +
" and Opiniao.idestadio = Instante.idestadio and Instante.minutosegundo = Opiniao.minutosegundoinstante)" + " where " +
                                  "Opiniao.idestadio=@ids and Opiniao.datahora=@datahora and" +
                                  " Opiniao.datavisitante=@datavis and Opiniao.idvisitante=@idvis and" +
                                  " Opiniao.datadefronta=@dataaga and Opiniao.iddefronta=@idaga and Instante.idevento=@idevent and nagativa=@neg";


                cmd.Parameters.Add("@ids", SqlDbType.Int).Value = idstadium;
                cmd.Parameters.Add("@datahora", SqlDbType.DateTime).Value = datahora.ToString("yyy-MM-dd HH:mm:ss");
                cmd.Parameters.Add("@datavis", SqlDbType.DateTime).Value = dataequipav.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idvis", SqlDbType.Int).Value = idequipav;
                cmd.Parameters.Add("@dataaga", SqlDbType.DateTime).Value = dataequipag.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idaga", SqlDbType.Int).Value = idequipag;
                cmd.Parameters.Add("@idevent", SqlDbType.Int).Value = idevent;
                cmd.Parameters.Add("@neg", SqlDbType.Int).Value = (negative == "yes") ? 1 : 0;

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        int rows = 0;
                        if (reader.Read())
                        {
                            return reader.GetInt32(0);
                            //rows++;
                        }
                        //return rows;
                        //return reader.Cast<Object>().Count();
                        return 0;
                    }

                }

                finally
                {
                    conn.Close();
                }

            }
        }




        public int GetUserOpinionByEvent(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, String idutilizador, int idevent,
            String negative)
        {


            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select count(*) from Opiniao inner join Instante on (Instante.datadefronta = Opiniao.datadefronta and Instante.datahora = Opiniao.datahora"+
" and Opiniao.iddefronta = Instante.iddefronta and Opiniao.datavisitante = Instante.datavisitante and Opiniao.idvisitante=Instante.idvisitante"+
" and Opiniao.idestadio = Instante.idestadio and Instante.minutosegundo = Opiniao.minutosegundoinstante)" +" where "+
                                  "Opiniao.idestadio=@ids and Opiniao.datahora=@datahora and" +
                                  " Opiniao.datavisitante=@datavis and Opiniao.idvisitante=@idvis and" +
                                  " Opiniao.datadefronta=@dataaga and Opiniao.iddefronta=@idaga and Opiniao.idutilizador=@iduser and Instante.idevento=@idevent and nagativa=@neg";

                
                cmd.Parameters.Add("@ids", SqlDbType.Int).Value = idstadium;
                cmd.Parameters.Add("@datahora", SqlDbType.DateTime).Value = datahora.ToString("yyy-MM-dd HH:mm:ss");
                cmd.Parameters.Add("@datavis", SqlDbType.DateTime).Value = dataequipav.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idvis", SqlDbType.Int).Value = idequipav;
                cmd.Parameters.Add("@dataaga", SqlDbType.DateTime).Value = dataequipag.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idaga", SqlDbType.Int).Value = idequipag;
                cmd.Parameters.Add("@iduser", SqlDbType.VarChar).Value = idutilizador;
                cmd.Parameters.Add("@idevent", SqlDbType.Int).Value = idevent;
                cmd.Parameters.Add("@neg", SqlDbType.Int).Value = (negative == "yes") ? 1 : 0;

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        int rows = 0;
                        if (reader.Read())
                        {
                            return reader.GetInt32(0);
                            //rows++;
                        }
                        //return rows;
                        //return reader.Cast<Object>().Count();
                        return 0;
                    }
                    
                }

                finally
                {
                    conn.Close();
                }

            }
        }




        public IEnumerable<Integrate> GetPlayersByTeam(int idclub , DateTime date)
        {
            
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select integrar.* from Equipa inner join integrar on(Equipa.id=integrar.idclube and Equipa.data=integrar.dataequipa) where Equipa.id=@idc and Equipa.data=@dt";
                cmd.Parameters.Add("@idc", SqlDbType.Int).Value = idclub;
                cmd.Parameters.Add("@dt", SqlDbType.DateTime).Value = date.ToString("yyyy-MM-dd");  
                //"select Actor.* from Equipa inner join integrar on(Equipa.id=conter.idclube and Equipa.data=conter.dataequipa) inner join Jogador on(Jogador.id=conter.idjogador)inner join Actor on(Jogador.id=Actor.id) where Equipa.id="+team.IdClub+" and Equipa.data='"+data+"'";

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            yield return new Integrate()
                            {
                                IdPlayer = reader.GetInt32(0),
                                IdClub = reader.GetInt32(1),
                                Date = reader.GetDateTime(2),
                                IdPosition = (reader.IsDBNull(3)) ? 0 : reader.GetInt32(3)
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


        public IEnumerable<Match> GetAllMatches()
        {
            
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Partida";

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            yield return new Match()
                            {
                                IdStadium = reader.GetInt32(0),
                                Date = reader.GetDateTime(1),
                                IdFirstReferee = reader.GetInt32(2),
                                IdSecondReferee = reader.GetInt32(3),
                                IdThirdReferee = reader.GetInt32(4),
                                IdFourReferee = reader.GetInt32(5),
                                DateVisitor = reader.GetDateTime(6),
                                IdVisitor = reader.GetInt32(7),
                                DateAgainst = reader.GetDateTime(8),
                                IdAgainst = reader.GetInt32(9),
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

        

        public void CreateMatch(Match match)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = new SqlCommand("InserirPartida", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter p1 = new SqlParameter("@idestadio", SqlDbType.Int, 4);
                p1.Value = match.IdStadium;
                p1.Direction = ParameterDirection.Input;

                SqlParameter p2 = new SqlParameter("@datahora", SqlDbType.DateTime, 8);
                p2.Value = match.Date.ToString("yyyy-MM-dd");
                p2.Direction = ParameterDirection.Input;

                SqlParameter p3 = new SqlParameter("@primeiroarbitro", SqlDbType.Int, 4);
                p3.Value = match.IdFirstReferee;
                p3.Direction = ParameterDirection.Input;

                SqlParameter p4 = new SqlParameter("@segundoarbitro", SqlDbType.Int, 4);
                p4.Value = match.IdSecondReferee;
                p4.Direction = ParameterDirection.Input;

                SqlParameter p5 = new SqlParameter("@terceiroarbitro", SqlDbType.Int, 4);
                p5.Value = match.IdThirdReferee;
                p5.Direction = ParameterDirection.Input;

                SqlParameter p6 = new SqlParameter("@quatroarbitro", SqlDbType.Int, 4);
                p6.Value = match.IdFourReferee;
                p6.Direction = ParameterDirection.Input;

                SqlParameter p7 = new SqlParameter("@datavisitante", SqlDbType.DateTime, 8);
                p7.Value = match.DateVisitor.ToString("yyyy-MM-dd");
                p7.Direction = ParameterDirection.Input;

                SqlParameter p8 = new SqlParameter("@idvisitante", SqlDbType.Int, 4);
                p8.Value = match.IdVisitor;
                p8.Direction = ParameterDirection.Input;

                SqlParameter p9 = new SqlParameter("@datadefronta", SqlDbType.DateTime, 8);
                p9.Value = match.DateAgainst.ToString("yyyy-MM-dd");
                p9.Direction = ParameterDirection.Input;

                SqlParameter p10 = new SqlParameter("@iddefronta", SqlDbType.Int, 4);
                p10.Value = match.IdAgainst;
                p10.Direction = ParameterDirection.Input;

                cmd.Parameters.Add(p1);
                cmd.Parameters.Add(p2);
                cmd.Parameters.Add(p3);
                cmd.Parameters.Add(p4);
                cmd.Parameters.Add(p5);
                cmd.Parameters.Add(p6);
                cmd.Parameters.Add(p7);
                cmd.Parameters.Add(p8);
                cmd.Parameters.Add(p9);
                cmd.Parameters.Add(p10);

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

        public void CreateOpinion(DateTime minutesecond, int idstadium, DateTime datehour, DateTime datevisitor,
            int idvisitor,
            DateTime dateagainst, int idagainst, String iduser, int cause, int? execute, DateTime datehouropinion,
            int negative, int idevent)
        {



            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = new SqlCommand("InserirInstante", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter p1 = new SqlParameter("@minutosegundo", SqlDbType.DateTime, 8);
                p1.Value = minutesecond.ToString("HH:mm:ss");
                p1.Direction = ParameterDirection.Input;

                SqlParameter p2 = new SqlParameter("@idestadio", SqlDbType.Int, 4);
                p2.Value = idstadium;
                p2.Direction = ParameterDirection.Input;

                SqlParameter p3 = new SqlParameter("@datahora", SqlDbType.DateTime, 8);
                p3.Value = datehour.ToString("yyyy-MM-dd HH:mm:ss");
                p3.Direction = ParameterDirection.Input;

                SqlParameter p4 = new SqlParameter("@datavisitante", SqlDbType.DateTime, 8);
                p4.Value = datevisitor.ToString("yyyy-MM-dd");
                p4.Direction = ParameterDirection.Input;

                SqlParameter p5 = new SqlParameter("@idvisitante", SqlDbType.Int, 4);
                p5.Value = idvisitor;
                p5.Direction = ParameterDirection.Input;

                SqlParameter p6 = new SqlParameter("@datadefronta", SqlDbType.DateTime, 8);
                p6.Value = dateagainst.ToString("yyyy-MM-dd");
                p6.Direction = ParameterDirection.Input;

                SqlParameter p7 = new SqlParameter("@iddefronta", SqlDbType.Int, 4);
                p7.Value = idagainst;
                p7.Direction = ParameterDirection.Input;

                SqlParameter p8 = new SqlParameter("@idutilizador", SqlDbType.VarChar, 50);
                p8.Value = iduser;
                p8.Direction = ParameterDirection.Input;

                SqlParameter p9 = new SqlParameter("@causou", SqlDbType.Int, 4);
                p9.Value = cause;
                p9.Direction = ParameterDirection.Input;

                SqlParameter p10 = new SqlParameter("@executou", SqlDbType.Int, 4);
                if (execute == null)
                    p10.Value = DBNull.Value;
                else
                {
                    p10.Value = execute;
                }
                p10.Direction = ParameterDirection.Input;

                SqlParameter p11 = new SqlParameter("@datahoraopiniao", SqlDbType.DateTime, 8);
                p11.Value = datehouropinion.ToString("yyyy-MM-dd HH:mm:ss");
                p11.Direction = ParameterDirection.Input;

                SqlParameter p12 = new SqlParameter("@negativa", SqlDbType.Int, 4);
                p12.Value = negative;
                p12.Direction = ParameterDirection.Input;

                SqlParameter p13 = new SqlParameter("@idevento", SqlDbType.Int, 4);
                p13.Value = idevent;
                p13.Direction = ParameterDirection.Input;



                cmd.Parameters.Add(p1);
                cmd.Parameters.Add(p2);
                cmd.Parameters.Add(p3);
                cmd.Parameters.Add(p4);
                cmd.Parameters.Add(p5);
                cmd.Parameters.Add(p6);
                cmd.Parameters.Add(p7);
                cmd.Parameters.Add(p8);
                cmd.Parameters.Add(p9);
                cmd.Parameters.Add(p10);
                cmd.Parameters.Add(p11);
                cmd.Parameters.Add(p12);
                cmd.Parameters.Add(p13);
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


        public void CreateOpinionUser(DateTime minutesecond, int idstadium, DateTime datehour, DateTime datevisitor,
            int idvisitor,
            DateTime dateagainst, int idagainst, String iduser, DateTime datehouropinion, String opinion)
        {

                //SqlTransaction transaction;
                using (SqlConnection conn = new SqlConnection(Stringconn))
                {
                    SqlCommand cmd = new SqlCommand("InserirOpiniao", conn);
                    cmd.CommandType = CommandType.StoredProcedure;

                    SqlParameter p1 = new SqlParameter("@minutosegundo", SqlDbType.DateTime, 8);
                    p1.Value = minutesecond.ToString("HH:mm:ss");
                    p1.Direction = ParameterDirection.Input;

                    SqlParameter p2 = new SqlParameter("@idestadio", SqlDbType.Int, 4);
                    p2.Value = idstadium;
                    p2.Direction = ParameterDirection.Input;

                    SqlParameter p3 = new SqlParameter("@datahora", SqlDbType.DateTime, 8);
                    p3.Value = datehour.ToString("yyyy-MM-dd HH:mm:ss");
                    p3.Direction = ParameterDirection.Input;

                    SqlParameter p4 = new SqlParameter("@datavisitante", SqlDbType.DateTime, 8);
                    p4.Value = datevisitor.ToString("yyyy-MM-dd");
                    p4.Direction = ParameterDirection.Input;

                    SqlParameter p5 = new SqlParameter("@idvisitante", SqlDbType.Int, 4);
                    p5.Value = idvisitor;
                    p5.Direction = ParameterDirection.Input;

                    SqlParameter p6 = new SqlParameter("@datadefronta", SqlDbType.DateTime, 8);
                    p6.Value = dateagainst.ToString("yyyy-MM-dd");
                    p6.Direction = ParameterDirection.Input;

                    SqlParameter p7 = new SqlParameter("@iddefronta", SqlDbType.Int, 4);
                    p7.Value = idagainst;
                    p7.Direction = ParameterDirection.Input;

                    SqlParameter p8 = new SqlParameter("@idutilizador", SqlDbType.VarChar, 50);
                    p8.Value = iduser;
                    p8.Direction = ParameterDirection.Input;

                    SqlParameter p9 = new SqlParameter("@datahoraopiniao", SqlDbType.DateTime, 8);
                    p9.Value = datehouropinion.ToString("yyyy-MM-dd HH:mm:ss.fff");
                    p9.Direction = ParameterDirection.Input;

                    SqlParameter p10 = new SqlParameter("@negativa", SqlDbType.Int, 4);
                    p10.Value = (opinion == "yes") ? 1 : 0;
                    p10.Direction = ParameterDirection.Input;


                    cmd.Parameters.Add(p1);
                    cmd.Parameters.Add(p2);
                    cmd.Parameters.Add(p3);
                    cmd.Parameters.Add(p4);
                    cmd.Parameters.Add(p5);
                    cmd.Parameters.Add(p6);
                    cmd.Parameters.Add(p7);
                    cmd.Parameters.Add(p8);
                    cmd.Parameters.Add(p9);
                    cmd.Parameters.Add(p10);

                    
                    //transaction = conn.BeginTransaction(datehouropinion + "");

                    try
                    {
                        conn.Open();
                        //cmd.Transaction = transaction;
                        cmd.ExecuteNonQuery();
                        //transaction.Commit();
                    }
                    finally
                    {
                        conn.Close();
                    }
                }
           

        }





        public IEnumerable<Instant> GetOpinionByMatch(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, int idutilizador)
        {
            return null;
        }

        public Instant GetInstant(int idstadium, DateTime datehour, int idteamv, DateTime datateamv,
            int idteamg, DateTime datateamg, DateTime instante)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Instante where idestadio=@ids and datahora=@datahora and datavisitante=@datavis and idvisitante=@idvis and datadefronta=@dataaga and iddefronta=@idaga and minutosegundo=@min";

                cmd.Parameters.Add("@ids", SqlDbType.Int).Value = idstadium;
                cmd.Parameters.Add("@datahora", SqlDbType.DateTime).Value = datehour.ToString("yyy-MM-dd HH:mm:ss");
                cmd.Parameters.Add("@datavis", SqlDbType.DateTime).Value = datateamv.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idvis", SqlDbType.Int).Value = idteamv;
                cmd.Parameters.Add("@dataaga", SqlDbType.DateTime).Value = datateamg.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idaga", SqlDbType.Int).Value = idteamg;
                cmd.Parameters.Add("@min", SqlDbType.Int).Value = instante.ToString("yyy-MM-dd HH:mm:ss");

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Instant()
                            {
                                MinuteSeconds = reader.GetDateTime(0),
                                IdStadium = reader.GetInt32(1),
                                DateMatch = reader.GetDateTime(2),
                                DateVisitor = reader.GetDateTime(3),
                                IdVisitor = reader.GetInt32(4),
                                DateAgainst = reader.GetDateTime(5),
                                IdAgainst = reader.GetInt32(6),
                                IdEvent = reader.GetInt32(7),
                                IdUser = reader.GetString(8),
                                IdCause = reader.GetInt32(9),
                                IdExecute = reader.IsDBNull(10) ? (int?)null : reader.GetInt32(10)

                            };
                        }
                        return null;
                    }
                }

                finally
                {
                    conn.Close();
                }

            }
        }

        public IEnumerable<Instant> GetAllInstantByCause(int idstadium, DateTime datehour, int idteamv, DateTime datateamv,
            int idteamg, DateTime datateamg, int cause)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Instante where idestadio=@ids and datahora=@datahora and datavisitante=@datavis and idvisitante=@idvis and datadefronta=@dataaga and iddefronta=@idaga and causou=@idcause";

                cmd.Parameters.Add("@ids", SqlDbType.Int).Value = idstadium;
                cmd.Parameters.Add("@datahora", SqlDbType.DateTime).Value = datehour.ToString("yyy-MM-dd HH:mm:ss");
                cmd.Parameters.Add("@datavis", SqlDbType.DateTime).Value = datateamv.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idvis", SqlDbType.Int).Value = idteamv;
                cmd.Parameters.Add("@dataaga", SqlDbType.DateTime).Value = datateamg.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idaga", SqlDbType.Int).Value = idteamg;
                cmd.Parameters.Add("@idcause", SqlDbType.Int).Value = cause;

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            yield return new Instant()
                            {
                                MinuteSeconds = reader.GetDateTime(0),
                                IdStadium = reader.GetInt32(1),
                                DateMatch = reader.GetDateTime(2),
                                DateVisitor = reader.GetDateTime(3),
                                IdVisitor = reader.GetInt32(4),
                                DateAgainst = reader.GetDateTime(5),
                                IdAgainst = reader.GetInt32(6),
                                IdEvent = reader.GetInt32(7),
                                IdUser = reader.GetString(8),
                                IdCause = reader.GetInt32(9),
                                IdExecute = reader.IsDBNull(10) ? (int?)null : reader.GetInt32(10)

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




        public IEnumerable<Instant> GetAllInstant(int idstadium, DateTime datehour, int idteamv, DateTime datateamv,
            int idteamg, DateTime datateamg)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Instante where idestadio=@ids and datahora=@datahora and datavisitante=@datavis and idvisitante=@idvis and datadefronta=@dataaga and iddefronta=@idaga";

                cmd.Parameters.Add("@ids", SqlDbType.Int).Value = idstadium;
                cmd.Parameters.Add("@datahora", SqlDbType.DateTime).Value = datehour.ToString("yyy-MM-dd HH:mm:ss");
                cmd.Parameters.Add("@datavis", SqlDbType.DateTime).Value = datateamv.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idvis", SqlDbType.Int).Value = idteamv;
                cmd.Parameters.Add("@dataaga", SqlDbType.DateTime).Value = datateamg.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idaga", SqlDbType.Int).Value = idteamg;

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            yield return new Instant()
                            {
                                MinuteSeconds = reader.GetDateTime(0),
                                IdStadium = reader.GetInt32(1),
                                DateMatch = reader.GetDateTime(2),
                                DateVisitor = reader.GetDateTime(3),
                                IdVisitor = reader.GetInt32(4),
                                DateAgainst = reader.GetDateTime(5),
                                IdAgainst = reader.GetInt32(6),
                                IdEvent = reader.GetInt32(7),
                                IdUser = reader.GetString(8),
                                IdCause = reader.GetInt32(9),
                                IdExecute = reader.IsDBNull(10) ? (int?)null : reader.GetInt32(10)
                                
                                
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


        public Opinion GetAllOpinionsByInstant(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, DateTime minitosegundo, String idutilizador)
        {


            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Opiniao where minutosegundoinstante=@min and idestadio=@ids and datahora=@datahora and" +
                                  " datavisitante=@datavis and idvisitante=@idvis and" +
                                  " datadefronta=@dataaga and iddefronta=@idaga and idutilizador=@iduser";

                cmd.Parameters.Add("@min", SqlDbType.DateTime).Value = minitosegundo.ToString("yyyy-MM-dd HH:mm:ss");
                cmd.Parameters.Add("@ids", SqlDbType.Int).Value = idstadium;
                cmd.Parameters.Add("@datahora", SqlDbType.DateTime).Value = datahora.ToString("yyy-MM-dd HH:mm:ss");
                cmd.Parameters.Add("@datavis", SqlDbType.DateTime).Value = dataequipav.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idvis", SqlDbType.Int).Value = idequipav;
                cmd.Parameters.Add("@dataaga", SqlDbType.DateTime).Value = dataequipag.ToString("yyy-MM-dd");
                cmd.Parameters.Add("@idaga", SqlDbType.Int).Value = idequipag;
                cmd.Parameters.Add("@iduser", SqlDbType.VarChar).Value = idutilizador;
                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Opinion()
                            {
                                Date = reader.GetDateTime(0),
                                Negative = Convert.ToBoolean(reader.GetInt32(1)),
                                IdUser = reader.GetString(2),
                                IdStadium = reader.GetInt32(3),
                                DateInstant = reader.GetDateTime(4),
                                DataPartida = reader.GetDateTime(5),
                                DateVisitor = reader.GetDateTime(6),
                                IdVisitor = reader.GetInt32(7),
                                DateAgainst = reader.GetDateTime(8),
                                IdAgainst = reader.GetInt32(9),
                                
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

        
        public Event GetEvent(int id)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Evento where id=@ide";
                cmd.Parameters.Add("@ide", SqlDbType.Int).Value = id;
                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Event()
                            {
                                Id = reader.GetInt32(0),
                                Icone = reader.IsDBNull(1)?null:reader.GetString(1),
                                Type = reader.GetString(2)
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


        public void InsertLayout(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, DateTime horaminuto,String svg)
        {


            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = new SqlCommand("InserirDisposicao", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter p1 = new SqlParameter("@svg", SqlDbType.VarChar, 8*1000);
                p1.Value = svg;
                p1.Direction = ParameterDirection.Input;


                SqlParameter p2 = new SqlParameter("@horaminuto", SqlDbType.DateTime, 8);
                p2.Value = horaminuto.ToString("HH:mm:ss");
                p2.Direction = ParameterDirection.Input;

                SqlParameter p3 = new SqlParameter("@idestadio", SqlDbType.Int, 4);
                p3.Value = idstadium;
                p3.Direction = ParameterDirection.Input;

                SqlParameter p4 = new SqlParameter("@datahora", SqlDbType.DateTime, 8);
                p4.Value = datahora.ToString("yyyy-MM-dd HH:mm:ss");
                p4.Direction = ParameterDirection.Input;

                SqlParameter p5 = new SqlParameter("@datavisitante", SqlDbType.DateTime, 8);
                p5.Value = dataequipav.ToString("yyyy-MM-dd");
                p5.Direction = ParameterDirection.Input;

                SqlParameter p6 = new SqlParameter("@idvisitante", SqlDbType.Int, 4);
                p6.Value = idequipav;
                p6.Direction = ParameterDirection.Input;

                SqlParameter p7 = new SqlParameter("@datadefronta", SqlDbType.DateTime, 8);
                p7.Value = dataequipag.ToString("yyyy-MM-dd");
                p7.Direction = ParameterDirection.Input;

                SqlParameter p8 = new SqlParameter("@iddefronta", SqlDbType.Int, 4);
                p8.Value = idequipag;
                p8.Direction = ParameterDirection.Input;

                cmd.Parameters.Add(p1);
                cmd.Parameters.Add(p2);
                cmd.Parameters.Add(p3);
                cmd.Parameters.Add(p4);
                cmd.Parameters.Add(p5);
                cmd.Parameters.Add(p6);
                cmd.Parameters.Add(p7);
                cmd.Parameters.Add(p8);

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

        public void InsertUser(String name, int idrole)
        {

            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = new SqlCommand("InserirUtilizador", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter p1 = new SqlParameter("@nome", SqlDbType.VarChar, 50);
                p1.Value = name;
                p1.Direction = ParameterDirection.Input;

                SqlParameter p2 = new SqlParameter("@idpapel", SqlDbType.Int, 4);
                p2.Value = idrole;
                p2.Direction = ParameterDirection.Input;

                cmd.Parameters.Add(p1);
                cmd.Parameters.Add(p2);
                
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

        public Layout GetLayout(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select top 1 * from Disposicao where idestadio=" + idstadium + " and datahora='" + datahora.ToString("yyyy-MM-dd HH:mm:ss") +
                    "' and datavisitante='" + dataequipav.ToString("yyyy-MM-dd")+"' and idvisitante="+idequipav+
                    " and datadefronta='" + dataequipag.ToString("yyyy-MM-dd")+"' and iddefronta="+idequipag+
                    " order by horaminuto desc";

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            return new Layout()
                            {
                                Svg = reader.GetString(0),
                                Hourminute = reader.GetDateTime(1),
                                IdStadium = reader.GetInt32(2),
                                DateMatch = reader.GetDateTime(3),
                                DateVisitor = reader.GetDateTime(4),
                                IdVisitor = reader.GetInt32(5),
                                DateAgainst = reader.GetDateTime(6),
                                IdAgainst = reader.GetInt32(7)
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

    }
}
