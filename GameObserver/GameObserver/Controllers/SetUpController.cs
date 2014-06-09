using System;
using System.Collections.Generic;
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
        public SetUpController()
        {
            _repo = new RepositoryGameObserver();
            _mapperTeamToTeamModel = new TeamToTeamModel();
            _mapperActorToActorModel = new ActorToActorModel();
        }

        //
        // GET: /SetUp/
        public ActionResult Index()
        {
            TeamPositionModel model = new TeamPositionModel()
            {
                PlayerAway = _mapperActorToActorModel.MapAll(_repo.GetPlayersByTeam(_repo.GetTeam(Convert.ToDateTime("2014-05-23"),1))),
                PlayerHome = _mapperActorToActorModel.MapAll(_repo.GetPlayersByTeam(_repo.GetTeam(Convert.ToDateTime("2014-05-23"), 2)))
            };

            return View(model);
        }

        public ActionResult GetPlayers()
        {
            var PlayerHome =_mapperActorToActorModel.MapAll(
                    _repo.GetPlayersByTeam(_repo.GetTeam(Convert.ToDateTime("2014-05-23"), 2)));

            var PlayerAway =
                _mapperActorToActorModel.MapAll(
                    _repo.GetPlayersByTeam(_repo.GetTeam(Convert.ToDateTime("2014-05-23"), 2)));

            var all = PlayerHome.Concat(PlayerAway);
            return Json(all, JsonRequestBehavior.AllowGet);
        } 


	}
}