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
            try
            {
                int pos = context.Exercises.Where(e => e.moduleId == id).Count();
            Exercise newExercise = new Exercise();
            newExercise.exerciseName = exercise.exerciseName;
            newExercise.exerciseDescription = exercise.exerciseDescription;
                newExercise.exerciseCategory = exercise.exerciseCategory;
                newExercise.moduleId = id;
                newExercise.exerciseStatus = true;
            newExercise.exerciseOrder = pos + 1;

            context.Exercises.InsertOnSubmit(newExercise);
            context.SubmitChanges();
            return Request.CreateErrorResponse(HttpStatusCode.OK, "record inserted");
            }
            catch(Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "unable to insert try again later");
            }

        }
        public HttpResponseMessage Put(Order order)
        {

            for (int i = 0; i < (order.id).Count; i++)
            {
                Exercise mod = context.Exercises.FirstOrDefault(e => e.exerciseId == order.id[i]);
                mod.exerciseOrder = order.position[i];
                context.SubmitChanges();
            }
            return Request.CreateResponse(HttpStatusCode.OK, "positions updated");
        }
        public HttpResponseMessage Put(int id, Exercise exercise)
        {
            try
            {
                if (exercise is null||exercise.exerciseName == null || exercise.exerciseName == "")
                {
  throw new Exception();
                }
                else
                {
Exercise exer = context.Exercises.FirstOrDefault(e => e.exerciseId == id);
            exer.exerciseName = exercise.exerciseName;
            exer.exerciseDescription = exercise.exerciseDescription;
            exer.exerciseCategory = exercise.exerciseCategory;
            context.SubmitChanges();
            return Request.CreateResponse(HttpStatusCode.OK, "Exercise edited sucessfully");
                   
                }
               
            }
            catch(Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "unable to update record please try again later");
            }
            
        }
        public HttpResponseMessage Get( int id)
        {
            try
            {
                Exercise mod = context.Exercises.FirstOrDefault(e => e.exerciseId == id);
                mod.exerciseStatus = true;
                context.SubmitChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Exercise restored sucessfully");
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
 Exercise exer = context.Exercises.FirstOrDefault(e => e.exerciseId == id);
            exer.exerciseStatus = false;
            context.SubmitChanges();
            return Request.CreateErrorResponse(HttpStatusCode.OK, "record Deleted");
            }
            catch(Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "record not found");
            }
           
        }
    }
}
