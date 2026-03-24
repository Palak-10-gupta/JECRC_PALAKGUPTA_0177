using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CourseManagementAPI.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }

        public string CourseName { get; set; }

        public int DepartmentId { get; set; }

        public int Credits { get; set; }

        public bool SeatsAvailable { get; set; }
    }
}