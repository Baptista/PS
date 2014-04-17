using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Gamestats.Data;
using Gamestats.DomainModel;
using Gamestats.Mappers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Gamestats;
using Gamestats.Controllers;

namespace Gamestats.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
         private IRepositoryGamestats _repo;
        private GameEvent_To_GameEventModel _mapperGameEventToGameEventModel;
        private GameEventModel_To_GameEvent _mapperGameEventModelToGameEvent;

        public HomeControllerTest()
        {
            _repo = new SqlGamestatsRepository();
            _mapperGameEventToGameEventModel = new GameEvent_To_GameEventModel();
            _mapperGameEventModelToGameEvent = new GameEventModel_To_GameEvent();
        }

        //
        // GET: /GameEvent/
        [TestMethod]
        public void Index()
        {
            Assert.IsNotNull(_mapperGameEventToGameEventModel.MapAll(_repo.GetAllEvents()));
        }

        [TestMethod]
        public void Index2()
        {


            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void About()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.About() as ViewResult;

            // Assert
            Assert.AreEqual("Your application description page.", result.ViewBag.Message);
        }

        [TestMethod]
        public void Contact()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Contact() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }
    }
}
