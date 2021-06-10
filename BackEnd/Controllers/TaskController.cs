using BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BackEnd.Controllers
{
    public class TaskController : ApiController
    {
        private DataClasses1DataContext context;
        TaskController()
        {
            context = new DataClasses1DataContext(System.Configuration.ConfigurationManager.ConnectionStrings["validationsConnectionString"].ToString());
        }
        //public IEnumerable<Task> Get(int id)
        //{
        //    List<Task> ex = context.Tasks.Where(e=>e.taskId==id).ToList();
        //    return ex;
        //}
        public HttpResponseMessage Post([FromUri] int id, [FromBody] Task task)
        {
            int present = context.Exercises.Where(e => e.exerciseId == id).Count();
            if (present != 0)
            {
                int pos = context.Tasks.Where(e => e.taskId == id).Count();
                Task newTask = new Task();
                newTask.taskName = task.taskName;
                newTask.taskDescription = task.taskDescription;
                newTask.taskStatus = "true";
                newTask.taskPosition = pos + 1;
                newTask.exerciseId = id;

                context.Tasks.InsertOnSubmit(newTask);
                context.SubmitChanges();
                return Request.CreateErrorResponse(HttpStatusCode.OK, "record inserted");
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "unable to insert try again later");
            }
        }
        public HttpResponseMessage Delete(int id)
        {
            Task mod = context.Tasks.FirstOrDefault(e => e.taskId == id);
            mod.taskStatus = "false";
            context.SubmitChanges();
            return Request.CreateErrorResponse(HttpStatusCode.OK, "record Deleted");
        }
    }
}
