using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Web;

namespace BackEnd.Models
{
    public class GetModulesData
    {
        private List<Module> md;
       public GetModulesData()
        {
           
        }
        public IEnumerable<Module> getDataInOrder(List<Module> module)
        {

            var tas = new EntitySet<Task>();
            var exersise = new EntitySet<Exercise>();
            foreach(var mod in module)
            {
                foreach(var exer in mod.Exercises)
                {
                    
                   var task = exer.Tasks.OrderBy(e=>e.taskOrder);
                    tas.AddRange(task) ;
                    exer.Tasks = tas;
                    tas.Clear();
                }
                exersise.AddRange(mod.Exercises.OrderBy(e => e.exerciseOrder));
                mod.Exercises = exersise;
                exersise.Clear();
            }
            return module.OrderBy(e=>e.moduleOrder);
        }
    }
}