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

          try
            {
                int pos = context.Tasks.Where(e => e.exerciseId == id).Count();
                Task newTask = new Task();
                newTask.taskName = task.taskName;
                newTask.taskDescription = task.taskDescription;
                newTask.taskStatus = true;
                newTask.taskOrder = pos + 1;
                newTask.exerciseId = id;

                context.Tasks.InsertOnSubmit(newTask);
                context.SubmitChanges();
                return Request.CreateErrorResponse(HttpStatusCode.OK, "record inserted");
            }
           catch(Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "unable to insert try again later");
            }
        }
        public HttpResponseMessage Put(int id, Task task)
        {
            try
            {
                if (task is null||task.taskName == null || task.taskName == "")
                {
throw new Exception();
                }
                else
                {
Task tas = context.Tasks.FirstOrDefault(e => e.taskId == id);
            tas.taskName = task.taskName;
            tas.taskDescription = task.taskDescription;
            context.SubmitChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Task edited sucessfully");
                    
                }
                
            }
            catch(Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "unable to update record try again later");
            }
           
        }
        public HttpResponseMessage Put(Order order)
        {

            for (int i = 0; i < (order.id).Count; i++)
            {
                Task mod = context.Tasks.FirstOrDefault(e => e.taskId == order.id[i]);
                mod.taskOrder = order.position[i];
                context.SubmitChanges();
            }
            return Request.CreateResponse(HttpStatusCode.OK, "positions updated");
        }
        public HttpResponseMessage Get(int id)
        {
            try
            {
                Task mod = context.Tasks.FirstOrDefault(e => e.taskId == id);
                mod.taskStatus = true;
                context.SubmitChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Task restored sucessfully");
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
Task tas = context.Tasks.FirstOrDefault(e => e.taskId == id);
            tas.taskStatus = false;
            context.SubmitChanges();
            return Request.CreateErrorResponse(HttpStatusCode.OK, "record Deleted");
            }
            catch(Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "unable to delete record try again later");
            }
            
        }
    }
}
