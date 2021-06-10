using BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BackEnd.Controllers
{
    public class SegmentController : ApiController
    {
        private  DataClasses1DataContext context;
         SegmentController()
        {
            context = new DataClasses1DataContext(System.Configuration.ConfigurationManager.ConnectionStrings["validationsConnectionString"].ToString());
        }
        public IEnumerable<Module> Get()
        {
            List<Module> ex =context.Modules.ToList();
            return ex;
        }
       public HttpResponseMessage Post(Module module)
        {
            int pos = context.Modules.Count();
            Module mod = new Module();
            mod.moduleName = module.moduleName;
            mod.moduleDescription = module.moduleDescription;
            mod.moduleStatus = "true";
            mod.modulePosition = pos + 1;

            context.Modules.InsertOnSubmit(mod);
            context.SubmitChanges();
            return Request.CreateErrorResponse(HttpStatusCode.OK, "record inserted");
        }
        public HttpResponseMessage Delete(int id)
        {
            Module mod = context.Modules.FirstOrDefault(e => e.moduleId == id);
            mod.moduleStatus = "false";
            context.SubmitChanges();
            return Request.CreateErrorResponse(HttpStatusCode.OK, "record Deleted");
        }
    }
}
