using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using GameObserver.Data;
using GameObserver.DomainModel;
using GameObserver.Mappers;
using GameObserver.Models;

namespace GameObserver.Controllers
{
    [Authorize(Roles = "admin")]
    public class TeamController : Controller
    {

        private IRepositoryGameObserver _repo;
        private TeamToTeamModel _mapperTeamToTeamModel;
        private ActorToActorModel _mapperActorToActorModel;
        private ClubToClubModel _mapperClubToClubModel;
        private FormationToFormationModel _mapperFormationToFormationModel;
        private IntegrateToIntegrateModel _mapperIntegrateToIntegrateModel;

        public TeamController()
        {
            _repo = new RepositoryGameObserver();
            _mapperTeamToTeamModel = new TeamToTeamModel();
            _mapperActorToActorModel = new ActorToActorModel();
            _mapperClubToClubModel = new ClubToClubModel();
            _mapperFormationToFormationModel = new FormationToFormationModel();
            _mapperIntegrateToIntegrateModel = new IntegrateToIntegrateModel();
        }


        public void UpdateIntegrate(String idclub, String date, String idplayer, String idposition)
        {
            if (!idposition.Equals("null"))
            {
                _repo.UpdateIntegrate(Convert.ToInt32(idclub), Convert.ToDateTime(date), Convert.ToInt32(idplayer),
                    Convert.ToInt32(idposition));
            }
            else
            {
                _repo.UpdateIntegrate(Convert.ToInt32(idclub), Convert.ToDateTime(date), Convert.ToInt32(idplayer),
                    0);
            }
        }

        public ActionResult GetPlayer(String id)
        {
            ActorModel actor = _mapperActorToActorModel.Map(_repo.GetPlayer(Convert.ToInt32(id)));
            return Json(actor, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetFormation(String id)
        {
            FormationModel formationModel = _mapperFormationToFormationModel.Map(_repo.GetFormation(Convert.ToInt32(id)));
            return Json(formationModel, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetPlayerByClub(int idclub)
        {
            IEnumerable<ActorModel> integrateModelByTeam = _mapperActorToActorModel.MapAll(
                _repo.GetPlayersByClub(idclub)
                );
            return Json(integrateModelByTeam, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AdjustTeam(DateTime date, int idclub, int idformation)
        {
           
            ClubModel clubModel = _mapperClubToClubModel.Map(_repo.GetClub(idclub));
            
            TeamModel t = new TeamModel()
            {
                IdClub = idclub,
                Data = date,
                IdFormation = idformation,
                NameClub = clubModel.Name
            };

            return View(t);
        }

        //
        // GET: /Team/
        public ActionResult Index()
        {
            IEnumerable<TeamModel> allteams = _mapperTeamToTeamModel.MapAll(_repo.GetAllTeams()).ToList();
            foreach (var teamModel in allteams)
            {
                teamModel.NameClub = _repo.GetClub(teamModel.IdClub).Name;
                teamModel.Data = teamModel.Data;
                teamModel.Formation = _repo.GetFormation(teamModel.IdFormation).Designation;
                teamModel.PhotoClub = _repo.GetClub(teamModel.IdClub).Symbol;
            }
            return View(allteams);
        }

       
        //
        // GET: /Team/Create
        public ActionResult Create()
        {
            IEnumerable<ClubModel> clubModel = _mapperClubToClubModel.MapAll(_repo.GetAllClubs());
            IEnumerable<FormationModel> formationModel = _mapperFormationToFormationModel.MapAll(_repo.GetAllFormations());
            TeamCreateModel teamcreate = new TeamCreateModel()
            {
                AllClubs = clubModel,
                AllFormations = formationModel
            };
            return View(teamcreate);
        }

        //
        // POST: /Team/Create
        [HttpPost]
        public ActionResult Create(String selectedclub, String selectformation)
        {
            try
            {
                int idclub = Convert.ToInt32(selectedclub);
                int idformation = Convert.ToInt32(selectformation);
                DateTime data = DateTime.Now;
                
                _repo.CreateTeam(idformation,idclub,data);
                IEnumerable<ActorModel> playersModel = _mapperActorToActorModel.MapAll(_repo.GetPlayersByClub(Convert.ToInt32(selectedclub)));
                foreach (var playerModel in playersModel)
                {
                    _repo.InsertPlayersOnTeam(playerModel.Id,idclub,data,0);
                }
                return RedirectToAction("Index");
            }
            catch
            {
                return RedirectToAction("Create");
            }
        }

        public ActionResult GetPlayersByTeam(String date, String idclub)
        {
            IEnumerable<IntegrateModel> integrateModel = _mapperIntegrateToIntegrateModel.MapAll(
                _repo.GetPlayersByTeam(Convert.ToInt32(idclub),Convert.ToDateTime(date)));
            return Json(integrateModel, JsonRequestBehavior.AllowGet);
            
        }
    }
}
