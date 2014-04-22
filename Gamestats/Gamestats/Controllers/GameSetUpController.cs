using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Gamestats.Data;
using Gamestats.DomainModel;
using Gamestats.Mappers;
using Gamestats.Models;
using Microsoft.Ajax.Utilities;

namespace Gamestats.Controllers
{
    public class GameSetUpController : Controller
    {
        //
        // GET: /GameSetUp/
        private IRepositoryGamestats _repo;
        private GameSetUpModel_To_GameSetUp _mapGameSetUpModelToGameSetUp;
        private GameSetUp_To_GameSetUpModel _mapGameSetUpToGameSetUpModel;

        public GameSetUpController()
        {
            _repo = new SqlGamestatsRepository();
            _mapGameSetUpModelToGameSetUp = new GameSetUpModel_To_GameSetUp();
            _mapGameSetUpToGameSetUpModel = new GameSetUp_To_GameSetUpModel();        
        }

        public ViewResult Index()
        {
            return View(_mapGameSetUpToGameSetUpModel.MapAll(_repo.GetAllGameSetUps()));
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(GameSetUpModels gameSetUpModels)
        {
            _repo.CreateGameSetUp(_mapGameSetUpModelToGameSetUp.Map(gameSetUpModels));
            return RedirectToAction("Index");
        }

        public ActionResult Details(int id)
        {
            return View(_mapGameSetUpToGameSetUpModel.Map(_repo.GetGameSetUp(id)));
        }

        public ActionResult Edit(int id)
        {
            return View(_mapGameSetUpToGameSetUpModel.Map(_repo.GetGameSetUp(id)));
        }

        public ActionResult Edit(GameSetUpModels gameSetUpModels)
        {
            _repo.UpdateSetUp(_mapGameSetUpModelToGameSetUp.Map(gameSetUpModels));
            return RedirectToAction("Index");
        }

        public ActionResult Delete(int id)
        {
            return View(_mapGameSetUpToGameSetUpModel.Map(_repo.GetGameSetUp(id)));
        }
        [HttpPost , ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            _repo.DeleteSetUp(id);
            return RedirectToAction("Index");
        }
    }
}