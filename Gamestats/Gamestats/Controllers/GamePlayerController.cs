using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Gamestats.Data;
using Gamestats.DomainModel;
using Gamestats.Mappers;
using Gamestats.Models;

namespace Gamestats.Controllers
{
    public class GamePlayerController : Controller
    {
        private IRepositoryGamestats _repo;
        private GamePlayer_To_GamePlayerModel _mapPlayerToGamePlayerModel;
        private GamePlayerModel_To_GamePlayer _mapPlayerModelToGamePlayer;
        public GamePlayerController()
        {
            _repo = new SqlGamestatsRepository();
            _mapPlayerToGamePlayerModel = new GamePlayer_To_GamePlayerModel();
            _mapPlayerModelToGamePlayer = new GamePlayerModel_To_GamePlayer();
        }
        //
        // GET: /GamePlayer/
        public ActionResult Index()
        {
            return View(_mapPlayerToGamePlayerModel.MapAll(_repo.GetAllPlayers()));
        }

        //
        // GET: /GamePlayer/Details/5
        public ActionResult Details(int id)
        {
            return View(_mapPlayerToGamePlayerModel.Map(_repo.GetPlayer(id)));
        }

        //
        // GET: /GamePlayer/Create
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /GamePlayer/Create
        [HttpPost]
        public ActionResult Create(GamePlayerModels gamePlayerModels)
        {
            try
            {
                _repo.CreatePlayer(_mapPlayerModelToGamePlayer.Map(gamePlayerModels));

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /GamePlayer/Edit/5
        public ActionResult Edit(int id)
        {
            return View(_mapPlayerToGamePlayerModel.Map(_repo.GetPlayer(id)));
        }

        //
        // POST: /GamePlayer/Edit/5
        [HttpPost]
        public ActionResult Edit(GamePlayerModels gamePlayerModels)
        {
            try
            {
               _repo.UpdatePlayer(_mapPlayerModelToGamePlayer.Map(gamePlayerModels));
                
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /GamePlayer/Delete/5
        public ActionResult Delete(int id)
        {
            return View(_mapPlayerToGamePlayerModel.Map(_repo.GetPlayer(id)));
        }

        //
        // POST: /GamePlayer/Delete/5
        [HttpPost,ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            try
            {
                _repo.DeletePlayer(id);
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
