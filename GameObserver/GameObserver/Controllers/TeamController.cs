using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Linq;
using GameObserver.Data;
using GameObserver.DomainModel;
using GameObserver.DomainModel.Entities;
using GameObserver.Mappers;
using GameObserver.Models;

namespace GameObserver.Controllers
{
    public class TeamController : Controller
    {

        private IRepositoryGameObserver _repo;
        private TeamModelToTeam _mapperTeamModelToTeam;
        private TeamToTeamModel _mapperTeamToTeamModel;
        private ActorModelToActor _mapperActorModelToActor;
        private ActorToActorModel _mapperActorToActorModel;
        private ClubToClubModel _mapperClubToClubModel;
        private FormationToFormationModel _mapperFormationToFormationModel;

        public TeamController()
        {
            _repo = new RepositoryGameObserver();
            _mapperTeamModelToTeam = new TeamModelToTeam();
            _mapperTeamToTeamModel = new TeamToTeamModel();
            _mapperActorModelToActor = new ActorModelToActor();
            _mapperActorToActorModel = new ActorToActorModel();
            _mapperClubToClubModel = new ClubToClubModel();
            _mapperFormationToFormationModel = new FormationToFormationModel();
        }

        //
        // GET: /Team/
        public ActionResult Index()
        {
            return View(_mapperTeamToTeamModel.MapAll(_repo.GetAllTeams()));
        }

        //
        // GET: /Team/Details/5
        public ActionResult Details(DateTime date, int idclub, int idformation)
        {
            TeamModel teamModel = _mapperTeamToTeamModel.Map(_repo.GetTeam(date, idclub));
            IEnumerable<ActorModel> actorModelByTeam = _mapperActorToActorModel.MapAll(_repo.GetPlayersByTeam(_mapperTeamModelToTeam.Map(teamModel)));
            IEnumerable<ActorModel> actorModelAll = _mapperActorToActorModel.MapAll(_repo.GetAllPlayers());

            ClubModel clubModel = _mapperClubToClubModel.Map(_repo.GetClub(idclub));
            FormationModel formationModel = _mapperFormationToFormationModel.Map(_repo.GetFormation(idformation));

            TeamDetailsModel detailsModel = new TeamDetailsModel()
            {
                Formation = formationModel,
                Club = clubModel,
                Team = teamModel,
                PlayersByTeam = actorModelByTeam,
                AllPlayers = actorModelAll
            };
            return View(detailsModel);
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
                TeamModel teamModel = new TeamModel()
                {
                    IdClub = Convert.ToInt32(selectedclub),
                    IdFormation = Convert.ToInt32(selectformation),
                    Data = DateTime.Now
                };
                _repo.CreateTeam(_mapperTeamModelToTeam.Map(teamModel));
                return RedirectToAction("Index");
            }
            catch
            {
                return RedirectToAction("Create");
            }
        }

        //
        // GET: /Team/Edit/5
        public ActionResult Edit(int id)
        {
            return null;//View();
        }

        //
        // POST: /Team/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return null;//View();
            }
        }

        //
        // GET: /Team/Delete/5
        public ActionResult Delete(int id)
        {
            return null;//View();
        }

        //
        // POST: /Team/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return null;//View();
            }
        }

        public ActionResult Search(String q)
        {
            var pla = _mapperActorToActorModel.MapAll(_repo.GetPlayers(q));

            return Json(pla, JsonRequestBehavior.AllowGet);
        }

        public void InserirPlayerOnTeam(String idclub, String idplayer, String date, String onstarteam)
        {
            _repo.InsertPlayersOnTeam(Convert.ToInt32(idplayer),Convert.ToInt32(idclub),Convert.ToDateTime(date),Convert.ToInt32(onstarteam));
        }
        public void RemovePlayerOnTeam(int idclub, int idplayer, DateTime date)
        {
            _repo.RemovePlayersOnTeam(Convert.ToInt32(idplayer), Convert.ToInt32(idclub), Convert.ToDateTime(date));
        }

        public ActionResult GetImage(int id)
        {
            throw new NotImplementedException();
        }
    }
}
