using GroceryPortal.Models.attributes;
using System.ComponentModel.DataAnnotations;

namespace GroceryPortal.dto
{
    public class UpdateGroceryDto
    {
        public string? Name { get; set; }

        public string? Category { get; set; }

        [Price]
        public double? Price { get; set; }

        [Quantity]
        public int? Quantity { get; set; }
    }
}