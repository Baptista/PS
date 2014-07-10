using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GameObserver.Data;
using GameObserver.DomainModel;
using GameObserver.Mappers;
using GameObserver.Models;

namespace GameObserver.Controllers
{
    public class SetUpController : Controller
    {
        private IRepositoryGameObserver _repo;
        private TeamToTeamModel _mapperTeamToTeamModel;
        private ActorToActorModel _mapperActorToActorModel;
        private StadiumToStadiumModel _mapperStadiumToStadiumModel;
        private MatchModelToMatch _mapperMatchModelToMatch;
        private MatchToMatchModel _mapperMatchToMatchModel;
        private FormationToFormationModel _mapperFormationToFormationModel;
        private PositionToPositionModel _mapperPositionToPositionModel;
        private ClubToClubModel _mapperClubToClubModel;
        private EventToEventModel _mapperEventToEventModel;
        private InstantToInstantModel _mapperInstantToInstantModel;
        private OpinionToOpinionModel _mapperOpinionToOpinionModel;
        private AssociateToAssociateModel _mapperAssociateToAssociateModel;
        private LayoutToLayoutModel _mapperLayoutToLayoutModel;
        private PlayerToPlayerModel _mapperPlayerToPlayerModel;

        public SetUpController()
        {
            _repo = new RepositoryGameObserver();
            _mapperTeamToTeamModel = new TeamToTeamModel();
            _mapperActorToActorModel = new ActorToActorModel();
            _mapperStadiumToStadiumModel = new StadiumToStadiumModel();
            _mapperMatchModelToMatch = new MatchModelToMatch();
            _mapperMatchToMatchModel = new MatchToMatchModel();
            _mapperFormationToFormationModel = new FormationToFormationModel();
            _mapperPositionToPositionModel = new PositionToPositionModel();
            _mapperClubToClubModel = new ClubToClubModel();
            _mapperEventToEventModel = new EventToEventModel();
            _mapperInstantToInstantModel = new InstantToInstantModel();
            _mapperOpinionToOpinionModel = new OpinionToOpinionModel();
            _mapperAssociateToAssociateModel = new AssociateToAssociateModel();
            _mapperLayoutToLayoutModel = new LayoutToLayoutModel();
            _mapperPlayerToPlayerModel = new PlayerToPlayerModel();
        }

        //
        // GET: /SetUp/
        public ActionResult Index()
        {
            //TeamPositionModel model = new TeamPositionModel()
            //{
            //    PlayerAway = _mapperActorToActorModel.MapAll(_repo.GetPlayersByTeam(_repo.GetTeam(Convert.ToDateTime("2014-05-23"),1))),
            //    PlayerHome = _mapperActorToActorModel.MapAll(_repo.GetPlayersByTeam(_repo.GetTeam(Convert.ToDateTime("2014-05-23"), 2)))
            //};
            
            return View(_mapperMatchToMatchModel.MapAll(_repo.GetAllMatches()));
        }

        public ActionResult Create()
        {
            IEnumerable<TeamModel> allTeams = _mapperTeamToTeamModel.MapAll(_repo.GetAllTeams());
            IEnumerable<StadiumModel> allStadiums = _mapperStadiumToStadiumModel.MapAll(_repo.GetAllStadiums());
            IEnumerable<ActorModel> allReferees = _mapperActorToActorModel.MapAll(_repo.GetAllReferees());

            CreateGameModel game=new CreateGameModel()
            {
                AllReferees = allReferees,
                AllStadiums = allStadiums,
                AllTeams = allTeams
            };

            return View(game);
        }

        [HttpPost]
        public ActionResult Create(String selectedhome, String selectedaway,String selectedstadium,
            String selectedrefereefirst, String selectedrefereesecond, String selectedrefereethird, String selectedrefereefour)
        {
            string[] hometeam = selectedhome.Split('|');
            string[] awayteam = selectedaway.Split('|');

            MatchModel matchModel = new MatchModel()
            {
                Date = DateTime.Now,
                IdStadium = Convert.ToInt32(selectedstadium),
                IdFirstReferee = Convert.ToInt32(selectedrefereefirst),
                IdSecondReferee = Convert.ToInt32(selectedrefereesecond),
                IdThirdReferee = Convert.ToInt32(selectedrefereethird),
                IdFourReferee = Convert.ToInt32(selectedrefereefour),
                IdVisitor = Convert.ToInt32(hometeam[0]),
                DateVisitor = Convert.ToDateTime(hometeam[1]),
                IdAgainst = Convert.ToInt32(awayteam[0]),
                DateAgainst = Convert.ToDateTime(awayteam[1])
            };

            //TeamModel home = _mapperTeamToTeamModel.Map(_repo.GetTeam(Convert.ToDateTime(hometeam[0]), Convert.ToInt32(hometeam[1])));
            //TeamModel away = _mapperTeamToTeamModel.Map(_repo.GetTeam(Convert.ToDateTime(awayteam[0]), Convert.ToInt32(awayteam[1])));
            //StadiumModel stadiumModel = _mapperStadiumToStadiumModel.Map(_repo.GetStadium(Convert.ToInt32(selectedstadium)));
            //ActorModel firstReferee = _mapperActorToActorModel.Map(_repo.GetReferee(Convert.ToInt32(selectedrefereefirst)));
            //ActorModel secondReferee = _mapperActorToActorModel.Map(_repo.GetReferee(Convert.ToInt32(selectedrefereesecond)));
            //ActorModel thirdReferee = _mapperActorToActorModel.Map(_repo.GetReferee(Convert.ToInt32(selectedrefereethird)));
            //ActorModel fourReferee = _mapperActorToActorModel.Map(_repo.GetReferee(Convert.ToInt32(selectedrefereefour)));
            //DateTime now = DateTime.Now;

            _repo.CreateMatch(_mapperMatchModelToMatch.Map(matchModel));

            return RedirectToAction("Index");

        }
        
        public ActionResult Details(
            int idstadium, DateTime date, int idfirstref,
                int idsecondref, int idthirdref, int idfourref,
                int idvisitor, DateTime datevisitor, int idagainst, DateTime dateagainst
            )
        {

            //LayoutModel layoutModel = _mapperLayoutToLayoutModel.Map(_repo.GetLayout(Convert.ToInt32(idstadium),
            //    Convert.ToDateTime(date),Convert.ToInt32(idvisitor),Convert.ToDateTime(datevisitor),
            //    Convert.ToInt32(idagainst),Convert.ToDateTime(dateagainst)));


            MatchModel matchModel = new MatchModel()
            {
                Date = date,
                IdStadium = idstadium,
                IdFirstReferee = idfirstref,
                IdSecondReferee = idsecondref,
                IdThirdReferee = idthirdref,
                IdFourReferee = idfourref,
                IdVisitor = idvisitor,
                DateVisitor = datevisitor,
                IdAgainst = idagainst,
                DateAgainst = dateagainst
            };
            ClubModel visitor = _mapperClubToClubModel.Map(_repo.GetClub(idvisitor));
            ClubModel against = _mapperClubToClubModel.Map(_repo.GetClub(idagainst));


            

            GameDetails details = new GameDetails()
            {
                matchModel = matchModel,
                clubvisitor = visitor,
                clubagainst = against
            };

            return View(details);
        }


        //public ActionResult GetPlayers(String id,String dateq)
        //{
        //    var Players = _mapperActorToActorModel.MapAll(
        //            _repo.GetPlayersByTeam(_repo.GetTeam(Convert.ToDateTime(dateq), Convert.ToInt32(id))));
            
        //    return Json(Players, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult GetFormation(String id, String dateq)
        {
            FormationModel formationModel = _mapperFormationToFormationModel.Map(_repo.GetFormation(_repo.GetTeam(Convert.ToDateTime(dateq), Convert.ToInt32(id)).IdFormation));
            return Json(formationModel, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetPlayerPosition(String id)
        {
            PositionModel model = _mapperPositionToPositionModel.Map(_repo.GetPosition(Convert.ToInt32(id)));
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetReferee(String id)
        {
            ActorModel actorModel = _mapperActorToActorModel.Map(_repo.GetReferee(Convert.ToInt32(id)));
            return Json(actorModel, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetPlayer(String id)
        {
            ActorModel actor = _mapperActorToActorModel.Map(_repo.GetPlayer(Convert.ToInt32(id)));
            return Json(actor, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetEvents()
        {
            IEnumerable<EventModel> evens = _mapperEventToEventModel.MapAll(_repo.GetAllEvents());
            return Json(evens , JsonRequestBehavior.AllowGet);
        }

        public void CreateOpinion(String datenow,
            String idstadium, String datahora, String datavisitor, String idvisitante, String datadefronta,
            String iddefronta, String idcausador , int idevento)
        {
            DateTime d = DateTime.Parse(datenow.Substring(0,25));
            //var utcTime = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(d, "Pacific Standard Time", "UTC");
            _repo.CreateOpinion(d , Convert.ToInt32(idstadium),Convert.ToDateTime(datahora),Convert.ToDateTime(datavisitor),Convert.ToInt32(idvisitante),Convert.ToDateTime(datadefronta),
                Convert.ToInt32(iddefronta),1,Convert.ToInt32(idcausador), null,DateTime.Now,1,Convert.ToInt32(idevento));
        }


        public IEnumerable<TimeLineModel> CreateTimeLine(String idstadium, String datahora, String idequipav, String dataequipav,
            String idequipag, String dataequipag)
        {
            IEnumerable<InstantModel> allInstantModels = _mapperInstantToInstantModel.MapAll(_repo.GetAllInstant(Convert.ToInt32(idstadium), Convert.ToDateTime(datahora), Convert.ToInt32(idequipav),
                Convert.ToDateTime(dataequipav),
                Convert.ToInt32(idequipag), Convert.ToDateTime(dataequipag)));

            foreach (var allInstantModel in allInstantModels)
            {
                IEnumerable<OpinionModel> allOpinionModels =
                    _mapperOpinionToOpinionModel.MapAll(_repo.GetAllOpinionsByInstant(Convert.ToInt32(idstadium),
                        Convert.ToDateTime(datahora),
                        Convert.ToInt32(idequipav), Convert.ToDateTime(dataequipav), Convert.ToInt32(idequipag),
                        Convert.ToDateTime(dataequipag), allInstantModel.MinuteSeconds));
                foreach (var opinion in allOpinionModels)
                {
                    IEnumerable<AssociateModel> allAssociateModels = _mapperAssociateToAssociateModel.MapAll(_repo.GetAllAssociatesbyOpinionEvent(opinion.Date,
                        1));

                    foreach (var allAssociateModel in allAssociateModels)
                    {
                        yield return new TimeLineModel()
                        {
                            date = allInstantModel.MinuteSeconds,
                            eventId = allAssociateModel.IdEvent,
                            causeId = allInstantModel.IdCause,
                            executeId = allInstantModel.IdExecute
                        };
                    }
                }
            }
        }

        public ActionResult GetTimeLine(String idstadium , String datahora, String idequipav, String dataequipav, String idequipag, String dataequipag)
        {

            IEnumerable<TimeLineModel> allTimeLineModels = CreateTimeLine(idstadium, datahora, idequipav, dataequipav, idequipag, dataequipag);
            return Json(allTimeLineModels, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetNamesForTimeLine(String idevent, String idcause, String idexecute)
        {
            EventModel ev = _mapperEventToEventModel.Map(_repo.GetEvent(Convert.ToInt32(idevent)));
            ActorModel ac = _mapperActorToActorModel.Map(_repo.GetPlayer(Convert.ToInt32(idcause)));
            ActorModel ae = null;
            if (!idexecute.Equals("null"))
            {
                ae = _mapperActorToActorModel.Map(_repo.GetPlayer(Convert.ToInt32(idexecute)));
            }
            TimeLineNameModel tm = new TimeLineNameModel()
            {
                eventName = ev.Type,
                causeName = ac.Name,
                executeName = (ae != null) ? ae.Name : null
            };
            return Json(tm, JsonRequestBehavior.AllowGet);
        }


       [ValidateInput(false)]
        public void InsertLayout(String idstadium, String datahora, String idequipav, 
            String dataequipav, String idequipag, String dataequipag, String datenow, String svg)
        {
            DateTime d = DateTime.Parse(datenow.Substring(0,25));

            _repo.InsertLayout(Convert.ToInt32(idstadium),Convert.ToDateTime(datahora),Convert.ToInt32(idequipav),Convert.ToDateTime(dataequipav),
                Convert.ToInt32(idequipag),Convert.ToDateTime(dataequipag),d,svg);
        }


        public ActionResult GetPosition(String id)
        {
            PositionModel posmodel = _mapperPositionToPositionModel.Map(_repo.GetPosition(Convert.ToInt32(id)));
            return Json(posmodel, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetEvent(String id)
        {
            EventModel evmodel = _mapperEventToEventModel.Map(_repo.GetEvent(Convert.ToInt32(id)));
            return Json(evmodel, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetPlayerWithClub(String idplayer)
        {
            PlayerModel plmodel = _mapperPlayerToPlayerModel.Map(_repo.GetPlayerWithClub(Convert.ToInt32(idplayer)));
            return Json(plmodel, JsonRequestBehavior.AllowGet);
        }
	}
}