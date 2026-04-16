using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace EmployeePortal.Models.attributes
{
    public class PasswordAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            // Null or empty check
            if (value is not string password || string.IsNullOrWhiteSpace(password))
            {
                return new ValidationResult("Password is required");
            }

            // Single condition validation
            if (password.Length < 8 ||
                !password.Any(char.IsUpper) ||
                !password.Any(char.IsLower) ||
                !password.Any(char.IsDigit) ||
                !password.Any(ch => !char.IsLetterOrDigit(ch)))
            {
                return new ValidationResult(
                    "Password must be at least 8 characters and contain uppercase, lowercase, digit, and special character"
                );
            }

            return ValidationResult.Success;
        }
    }
}