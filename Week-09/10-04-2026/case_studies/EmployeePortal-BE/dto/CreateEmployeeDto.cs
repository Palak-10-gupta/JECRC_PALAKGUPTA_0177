using System.ComponentModel.DataAnnotations;

namespace EmployeePortal.Models.dto
{
    public class CreateEmployeeDto
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string name { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string department { get; set; }

        [EmailAddress]
        [Required]
        public string email { get; set; }

        [Required]
        [Phone]
        public string phone { get; set; }

        [Required]
        public string password { get; set; }

        [Required]
        public decimal salary { get; set; }
        public string address { get; set; }
    }
}
