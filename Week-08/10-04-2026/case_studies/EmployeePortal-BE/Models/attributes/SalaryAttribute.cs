using System.ComponentModel.DataAnnotations;

namespace EmployeePortal.Models.attributes
{
    public class SalaryAttribute : ValidationAttribute
    {
        private readonly int minSalary;
        private readonly int maxSalary;

        public SalaryAttribute(int minSalary, int maxSalary)
        {
            this.minSalary = minSalary;
            this.maxSalary = maxSalary;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is decimal salary)
            {
                if ( minSalary > salary)
                    return new ValidationResult($"Salary must be at least {minSalary} ");

                if (maxSalary < salary)
                    return new ValidationResult($"Salary can not be higher than {maxSalary} ");
            }
            return ValidationResult.Success;
        }
    }
}