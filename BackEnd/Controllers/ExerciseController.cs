using BackEnd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BackEnd.Controllers
{
    public class ExerciseController : ApiController
    {
        private DataClasses1DataContext context;
        ExerciseController()
        {
            context = new DataClasses1DataContext(System.Configuration.ConfigurationManager.ConnectionStrings["validationsConnectionString"].ToString());
        }
        //public IEnumerable<Exercise> Get(int id)
        //{
        //    List<Exercise> ex = context.Exercises.Where(e=>e.exerciseId==id).ToList();
        //    return ex;
        //}
        public HttpResponseMessage Post([FromUri]int id,[FromBody]Exercise exercise)
        {
            int present = context.Modules.Where(e => e.moduleId == id).Count();
            if (present != 0)
            {
            int pos = context.Exercises.Where(e => e.exerciseId == id).Count();
            Exercise newExercise = new Exercise();
            newExercise.exerciseName = exercise.exerciseName;
            newExercise.exerciseDescription = exercise.exerciseDescription;
                newExercise.exerciseCategory = exercise.exerciseCategory;
                newExercise.moduleId = id;
                newExercise.exerciseStatus = "true";
            newExercise.exercisePosition = pos + 1;

            context.Exercises.InsertOnSubmit(newExercise);
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
            Exercise mod = context.Exercises.FirstOrDefault(e => e.exerciseId == id);
            mod.exerciseStatus = "false";
            context.SubmitChanges();
            return Request.CreateErrorResponse(HttpStatusCode.OK, "record Deleted");
        }
    }
}
