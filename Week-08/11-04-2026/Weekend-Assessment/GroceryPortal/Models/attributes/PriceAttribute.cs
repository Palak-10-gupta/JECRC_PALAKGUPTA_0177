using System.ComponentModel.DataAnnotations;

namespace GroceryPortal.Models.attributes
{
    public class PriceAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            // ✅ Allow null for PATCH
            if (value == null)
                return ValidationResult.Success;

            double price = (double)value;

            if (price <= 0)
                return new ValidationResult("Price must be greater than 0");

            return ValidationResult.Success;
        }
    }
}