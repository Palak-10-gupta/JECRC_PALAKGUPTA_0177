using System.ComponentModel.DataAnnotations;

namespace GroceryPortal.Models.attributes
{
    public class QuantityAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            // ✅ Allow null (important for PATCH)
            if (value == null)
                return ValidationResult.Success;

            int quantity = (int)value;

            if (quantity <= 0)
                return new ValidationResult("Quantity must be greater than 0");

            return ValidationResult.Success;
        }
    }
}