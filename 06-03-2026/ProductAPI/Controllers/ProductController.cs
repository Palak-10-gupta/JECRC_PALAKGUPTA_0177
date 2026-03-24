using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;         
using ProductAPI.Models; 


namespace ProductAPI.Controllers
{
    // The ProductController class is responsible for handling HTTP requests related to products.
    [ApiController]
    [Route("api/[controller]")]
    
    public class ProductController : ControllerBase
    {
        // Dependency injection of the database context
        private readonly ApplicationDbContext _context;

        // Constructor to initialize the database context
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
public IActionResult GetProducts()
{
    var products = _context.Products.ToList();

    if (products == null || products.Count == 0)
        return NotFound();

    return Ok(products);
}
       [HttpGet("{id}")]
public IActionResult GetProduct(int id)
{
    var product = _context.Products.Find(id);

    if (product == null)
        return NotFound();

    return Ok(product);
}
        //  Post: api/Product
        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();

            return Ok(product);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, Product updatedProduct)
    {
        var product = _context.Products.Find(id);

        if(product == null)
        return NotFound();

        product.Name = updatedProduct.Name;
        product.Price = updatedProduct.Price;
        product.Quantity = updatedProduct.Quantity;

        _context.SaveChanges();
        
        return Ok(product);
    }
//DELETE: api/Product/5
[HttpDelete("{id}")]
public IActionResult DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);

            if(product == null)
            return NotFound();

            _context.Products.Remove(product);
            _context.SaveChanges();

            return NoContent();
        }
    }
}