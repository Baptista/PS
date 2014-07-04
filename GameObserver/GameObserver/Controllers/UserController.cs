using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GameObserver.Data;
using GameObserver.DomainModel;
using GameObserver.Mappers;

namespace GameObserver.Controllers
{
    public class UserController : Controller
    {

        private IRepositoryGameObserver _repo;
        private MatchModelToMatch _mapperMatchModelToMatch;
        private MatchToMatchModel _mapperMatchToMatchModel;
        
        public UserController()
        {
            _repo = new RepositoryGameObserver();
            _mapperMatchModelToMatch = new MatchModelToMatch();
            _mapperMatchToMatchModel = new MatchToMatchModel();
            
        }

        public ActionResult Index()
        {
            return View(_mapperMatchToMatchModel.MapAll(_repo.GetAllMatches()));
        }
    }
}