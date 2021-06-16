using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BackEnd.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        public ActionResult Exercise()
        {
            ViewBag.Title = "Exercise";

            return View();
        }
        public ActionResult Task()
        {
            ViewBag.Title = "Task Page";

            return View();
        }
    }
}
