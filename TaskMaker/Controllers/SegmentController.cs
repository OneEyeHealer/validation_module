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
           var mod=new GetModulesData( );
            return mod.getDataInOrder(context.Modules.ToList());
        }
        public HttpResponseMessage Put(Order order)
        {

           for(int i = 0; i < (order.id).Count; i++)
            {
                Module mod = context.Modules.FirstOrDefault(e => e.moduleId == order.id[i]);
                mod.moduleOrder = order.position[i];
                context.SubmitChanges();
            }
            return Request.CreateResponse(HttpStatusCode.OK, "positions updated");
        }
       public HttpResponseMessage Post(Module module)
        {
            int pos = context.Modules.Count();
            Module mod = new Module();
            mod.moduleName = module.moduleName;
            mod.moduleDescription = module.moduleDescription;
            mod.moduleStatus = true;
            mod.moduleOrder = pos + 1;

            context.Modules.InsertOnSubmit(mod);
            context.SubmitChanges();
            return Request.CreateErrorResponse(HttpStatusCode.OK, "record inserted");
        }
        public HttpResponseMessage Put([FromUri]int id,[FromBody]Module module)
        {
            try
            {
                if (module is null || module.moduleName == null ||module.moduleName==""  )
                {
throw new Exception();
                }
                else
                {
                    Module mod = context.Modules.FirstOrDefault(e => e.moduleId == id);
            mod.moduleName=module.moduleName;
            mod.moduleDescription = module.moduleDescription;
            context.SubmitChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Module edited sucessfully");
                }

            }
            catch(Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "unable to update record try again later");
            }
            
        }
        public HttpResponseMessage Get([FromUri]int id)
        {
            try
            {
                Module mod = context.Modules.FirstOrDefault(e => e.moduleId == id);
                mod.moduleStatus = true;
                context.SubmitChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Module restored sucessfully");
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "unable to update record try again later");
            }

        }
        public HttpResponseMessage Delete(int id)
        {
            try
            {
Module mod = context.Modules.FirstOrDefault(e => e.moduleId == id);
            mod.moduleStatus = false;
            context.SubmitChanges();
            return Request.CreateErrorResponse(HttpStatusCode.OK, "record Deleted");
            }
            catch(Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "record not found try again later");
            }
            
        }
    }
}
