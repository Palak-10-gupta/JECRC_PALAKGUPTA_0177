namespace EmployeePortal.Models.entities
{
    public class Employee
    {
        public Guid Id { get; set; }

        public required string Name { get; set; }

        public required string Department { get; set; }

        public required string Password { get; set; }

        public required string Email { get; set; }

        public required string Phone { get; set; }

        public required string Address { get; set; }

        public required decimal Salary { get; set; }




    }
}