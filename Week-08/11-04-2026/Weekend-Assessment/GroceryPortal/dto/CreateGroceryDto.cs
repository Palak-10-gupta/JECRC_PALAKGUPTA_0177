using GroceryPortal.Models.attributes;
using System.ComponentModel.DataAnnotations;

namespace GroceryPortal.dto
{
    public class CreateGroceryDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Category { get; set; }

        [Price]   // your custom attribute
        public double Price { get; set; }

        [Quantity] // your custom attribute
        public int Quantity { get; set; }
    }
}