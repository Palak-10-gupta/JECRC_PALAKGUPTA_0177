using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using GroceryPortal.dto;
using GroceryPortal.entities;

namespace GroceryPortal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroceryController : ControllerBase
    {
        private static List<Grocery> groceryList = new List<Grocery>();
        private static int idCounter = 1;

        // CREATE
        [HttpPost]
        public IActionResult AddGrocery(CreateGroceryDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Grocery g = new Grocery
            {
                Id = idCounter++,
                Name = dto.Name,
                Category = dto.Category,
                Price = dto.Price,
                Quantity = dto.Quantity
            };

            groceryList.Add(g);

            return Ok(new GroceryResponseDto
            {
                Id = g.Id,
                Name = g.Name,
                Category = g.Category,
                Price = g.Price,
                Quantity = g.Quantity
            });
        }

        // GET ALL
        [HttpGet]
        public IActionResult GetAll()
        {
            var result = groceryList.Select(g => new GroceryResponseDto
            {
                Id = g.Id,
                Name = g.Name,
                Category = g.Category,
                Price = g.Price,
                Quantity = g.Quantity
            });

            return Ok(result);
        }

        // GET BY ID
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var g = groceryList.FirstOrDefault(x => x.Id == id);

            if (g == null)
                return NotFound("Grocery not found");

            return Ok(new GroceryResponseDto
            {
                Id = g.Id,
                Name = g.Name,
                Category = g.Category,
                Price = g.Price,
                Quantity = g.Quantity
            });
        }

        // PUT (FULL UPDATE)
        [HttpPut("{id}")]
        public IActionResult FullUpdate(int id, CreateGroceryDto dto)
        {
            var g = groceryList.FirstOrDefault(x => x.Id == id);

            if (g == null)
                return NotFound("Grocery not found");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            g.Name = dto.Name;
            g.Category = dto.Category;
            g.Price = dto.Price;
            g.Quantity = dto.Quantity;

            return Ok(new GroceryResponseDto
            {
                Id = g.Id,
                Name = g.Name,
                Category = g.Category,
                Price = g.Price,
                Quantity = g.Quantity
            });
        }

        // PATCH (PARTIAL UPDATE)
        [HttpPatch("{id}")]
        public IActionResult UpdateGrocery(int id, UpdateGroceryDto dto)
        {
            var g = groceryList.FirstOrDefault(x => x.Id == id);

            if (g == null)
                return NotFound("Grocery not found");

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (dto.Name != null)
                g.Name = dto.Name;

            if (dto.Category != null)
                g.Category = dto.Category;

            if (dto.Price.HasValue)
                g.Price = dto.Price.Value;

            if (dto.Quantity.HasValue)
                g.Quantity = dto.Quantity.Value;

            return Ok(new GroceryResponseDto
            {
                Id = g.Id,
                Name = g.Name,
                Category = g.Category,
                Price = g.Price,
                Quantity = g.Quantity
            });
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var g = groceryList.FirstOrDefault(x => x.Id == id);

            if (g == null)
                return NotFound("Grocery not found");

            groceryList.Remove(g);

            return Ok("Deleted successfully");
        }
    }
}