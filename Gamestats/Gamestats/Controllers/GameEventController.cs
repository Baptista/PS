﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Gamestats.Data;
using Gamestats.DomainModel;
using Gamestats.Mappers;
using Gamestats.Models;

namespace Gamestats.Controllers
{
    public class GameEventController : Controller
    {
        private IRepositoryGamestats _repo;
        private GameEvent_To_GameEventModel _mapperGameEventToGameEventModel;
        private GameEventModel_To_GameEvent _mapperGameEventModelToGameEvent;

        public GameEventController()
        {
            _repo = new SqlGamestatsRepository();
            _mapperGameEventToGameEventModel = new GameEvent_To_GameEventModel();
            _mapperGameEventModelToGameEvent = new GameEventModel_To_GameEvent();
        }

        //
        // GET: /GameEvent/
        public ActionResult Index()
        {
            return View(_mapperGameEventToGameEventModel.MapAll(_repo.GetAllEvents()));
        }

      
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(GameEventModels gameEventModels)
        {
            _repo.CreateEvent(_mapperGameEventModelToGameEvent.Map(gameEventModels));
            return RedirectToAction("Index");
        }

        public ActionResult Edit(int id)
        {
            return View(_mapperGameEventToGameEventModel.Map(_repo.GetEvent(id)));
        }

        [HttpPost]
        public ActionResult Edit(GameEventModels gameEventModels)
        {
            _repo.UpdadeEvent(_mapperGameEventModelToGameEvent.Map(gameEventModels));
            return RedirectToAction("Index");
        }

        public ActionResult Details(int id)
        {
            return View(_mapperGameEventToGameEventModel.Map(_repo.GetEvent(id)));
        }

        public ActionResult Delete(int id)
        {
            return View(_mapperGameEventToGameEventModel.Map(_repo.GetEvent(id)));
        }
        [HttpPost,ActionName("Delete")]
        public ActionResult DeleteComfirmed(int id)
        {
            _repo.DeleteEvent(id);
            return RedirectToAction("Index");
        }
    }
}
