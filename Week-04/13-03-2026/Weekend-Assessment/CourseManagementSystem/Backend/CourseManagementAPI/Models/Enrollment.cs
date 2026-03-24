using System.ComponentModel.DataAnnotations;

namespace CourseManagementAPI.Models
{
    public class Enrollment
    {
        [Key]
        public int EnrollmentId { get; set; }

        public int CourseId { get; set; }

        public int UserId { get; set; }

        public DateTime EnrollmentDate { get; set; }

        public DateTime? DropDate { get; set; }
    }
}