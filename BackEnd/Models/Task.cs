using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Models
{
    public class Task
    {
        [ForeignKey(name: "Exercise")]
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; }
        [Key]
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public bool TaskStatus { get; set; }
        public int TaskPosition { get; set; }
    }
}