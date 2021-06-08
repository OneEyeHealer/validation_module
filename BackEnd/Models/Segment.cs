using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace BackEnd.Models
{
    public class Segment
    {
        [Key]
        public int SegmentId { get; set; }
        public string SegmentName { get; set; }
        public string SegmentDescription { get; set; }
        public bool SegmentStatus { get; set; }
        public ICollection<Exercise> Exercises { get; set; }
    }
}