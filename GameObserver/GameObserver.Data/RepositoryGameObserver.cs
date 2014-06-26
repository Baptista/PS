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

        public Stadium GetStadium(int id)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Estadio where id="+id;

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

        public Position GetPosition(int idplayer)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select Posicao.* from Jogador inner join jogar on(Jogador.id = jogar.idjog) inner join Posicao on(Posicao.id = jogar.idpos) where Jogador.id = " + idplayer;

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
                SqlCommand cmd = new SqlCommand("InserirEquipa",conn);
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

        public void InsertPlayersOnTeam(int idplayer, int idclub,DateTime date, int onfield)
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
                cmd.CommandText = "select * from Actor where Arbitro=1 and id="+id;

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

        public Actor GetPlayer(int id)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Actor where Jogador=1 and id="+id;

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
                cmd.CommandText = "select * from Equipa where data='"+data+"' and id="+idclub;

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
            string data = team.Data.Date.ToString("yyyy-MM-dd");
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select Actor.* from Equipa inner join conter on(Equipa.id=conter.idclube and Equipa.data=conter.dataequipa) inner join Jogador on(Jogador.id=conter.idjogador)inner join Actor on(Jogador.id=Actor.id) where Equipa.id="+team.IdClub+" and Equipa.data='"+data+"'";

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

        public void CreateOpinion(DateTime minutosegundo, int idestadio, DateTime datahora, DateTime datavisitante,
            int idvisitante,
            DateTime datadefronta, int iddefronta, int idutilizador, int causou, int? executou, DateTime datahoraopiniao,
            int negativa, int idevento)
        {



            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = new SqlCommand("InserirOpiniao", conn);
                cmd.CommandType = CommandType.StoredProcedure;

                SqlParameter p1 = new SqlParameter("@minutosegundo", SqlDbType.DateTime, 8);
                p1.Value = minutosegundo.ToString("hh:mm:ss");
                p1.Direction = ParameterDirection.Input;

                SqlParameter p2 = new SqlParameter("@idestadio", SqlDbType.Int, 4);
                p2.Value = idestadio;
                p2.Direction = ParameterDirection.Input;

                SqlParameter p3 = new SqlParameter("@datahora", SqlDbType.DateTime, 8);
                p3.Value = datahora.ToString("yyyy-MM-dd HH:mm:ss");
                p3.Direction = ParameterDirection.Input;

                SqlParameter p4 = new SqlParameter("@datavisitante", SqlDbType.DateTime, 8);
                p4.Value = datavisitante.ToString("yyyy-MM-dd");
                p4.Direction = ParameterDirection.Input;

                SqlParameter p5 = new SqlParameter("@idvisitante", SqlDbType.Int, 4);
                p5.Value = idvisitante;
                p5.Direction = ParameterDirection.Input;

                SqlParameter p6 = new SqlParameter("@datadefronta", SqlDbType.DateTime, 8);
                p6.Value = datadefronta.ToString("yyyy-MM-dd");
                p6.Direction = ParameterDirection.Input;

                SqlParameter p7 = new SqlParameter("@iddefronta", SqlDbType.Int, 4);
                p7.Value = iddefronta;
                p7.Direction = ParameterDirection.Input;

                SqlParameter p8 = new SqlParameter("@idutilizador", SqlDbType.Int, 4);
                p8.Value = idutilizador;
                p8.Direction = ParameterDirection.Input;

                SqlParameter p9 = new SqlParameter("@causou", SqlDbType.Int, 4);
                p9.Value = causou;
                p9.Direction = ParameterDirection.Input;

                SqlParameter p10 = new SqlParameter("@executou", SqlDbType.Int, 4);
                p10.Value = 9;
                p10.Direction = ParameterDirection.Input;

                SqlParameter p11 = new SqlParameter("@datahoraopiniao", SqlDbType.DateTime, 8);
                p11.Value = datahoraopiniao.ToString("yyyy-MM-dd hh:mm:ss");
                p11.Direction = ParameterDirection.Input;

                SqlParameter p12 = new SqlParameter("@negativa", SqlDbType.Int, 4);
                p12.Value = negativa;
                p12.Direction = ParameterDirection.Input;

                SqlParameter p13 = new SqlParameter("@idevento", SqlDbType.Int, 4);
                p13.Value = idevento;
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

        public IEnumerable<Instant> GetOpinionByMatch(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, int idutilizador)
        {
            return null;
        }


        public IEnumerable<Instant> GetAllInstant(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Instante where idestadio="+idstadium+" and datahora='"+datahora.ToString("yyy-MM-dd HH:mm:ss")+
                    "' and datavisitante='" + dataequipav.ToString("yyyy-MM-dd") + "' and idvisitante=" + idequipav +
                    " and datadefronta='" + dataequipag.ToString("yyyy-MM-dd") + "' and iddefronta=" + idequipag + " and idutilizador=" + 1;

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
                                IdUser = reader.GetInt32(7),
                                IdCause = reader.GetInt32(8),
                                IdExecute = reader.GetInt32(9)
                                
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


        public IEnumerable<Opinion> GetAllOpinionsByInstant(int idstadium, DateTime datahora, int idequipav, DateTime dataequipav,
            int idequipag, DateTime dataequipag, DateTime minitosegundo)
        {


            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Opiniao where minutosegundoinstante='" + minitosegundo.ToString("yyyy-MM-dd HH:mm:ss") + "' and idestadio=" + idstadium + " and datahora='" + datahora.ToString("yyy-MM-dd HH:mm:ss") +
                    "' and datavisitante='" + dataequipav.ToString("yyyy-MM-dd") + "' and idvisitante=" + idequipav +
                    " and datadefronta='" + dataequipag.ToString("yyyy-MM-dd") + "' and iddefronta=" + idequipag + " and idutilizador=" + 1;

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            yield return new Opinion()
                            {
                                Date = reader.GetDateTime(0),
                                Negative = Convert.ToBoolean(reader.GetInt32(1)),
                                IdUser = reader.GetInt32(2),
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
                }

                finally
                {
                    conn.Close();
                }

            }
        }

        public IEnumerable<Associate> GetAllAssociatesbyOpinionEvent(DateTime datahora, int iduser)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from associar where datahora='" + datahora.ToString("yyyy-MM-dd HH:mm:ss") + "' and idutilizador=" + 1;

                try
                {
                    conn.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {

                            yield return new Associate()
                            {
                                IdEvent = reader.GetInt32(0),
                                Date = reader.GetDateTime(1),
                                IdUser = reader.GetInt32(2),
                                
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

        public Event GetEvent(int id)
        {
            using (SqlConnection conn = new SqlConnection(Stringconn))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "select * from Evento where id=" + id;

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
                                Icone = reader.GetString(1),
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

    }
}
