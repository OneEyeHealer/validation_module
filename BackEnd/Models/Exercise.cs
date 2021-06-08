using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace BackEnd.Models
{
    public class Exercise
    {
        [ForeignKey(name: "Segment")]
        public int SegmentId { get; set; }
        public Segment Segment { get; set; }
        [Key]
        public int ExerciseId { get; set; }
        public string ExerciseName { get; set; }
        public string ExerciseDescription { get; set; }
        public bool ExerciseStatus { get; set; }
        public ICollection<Task> Tasks { get; set; }
    }
}