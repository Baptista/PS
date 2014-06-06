using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GameObserver.Data;
using GameObserver.DomainModel;

namespace GameObserver.Controllers
{
    public class HomeController : Controller
    {
        private IRepositoryGameObserver _repo;

        public HomeController()
        {
            try
            {
                _repo = new RepositoryGameObserver();
            }
            catch (Exception e)
            {
                int a = 0;
            }
        }

        public ActionResult Index()
        {
            //try
            //{
            //    foreach (var VARIABLE in _repo.GetAllReferees())
            //    {
            //        int i =VARIABLE.Id;
            //    }
            //    _repo.GetAllClubs();
            //}
            //catch (Exception e)
            //{
            //    int a;
            //}
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}