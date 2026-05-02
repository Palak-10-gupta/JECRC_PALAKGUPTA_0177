
using System.ComponentModel.DataAnnotations;

namespace ProductManagement.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Range(0, 10000)]
        public decimal Price { get; set; }

        public int CategoryId { get; set; }
        //One-Many
        public Category Category { get; set;  }
        //One-One
        public ProductDetails productDetails { get; set; }
        //Many-Many
        public ICollection<ProductTag> ProductTags { get; set; }


    }
}
