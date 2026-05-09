using FoodOrdering.Core.Interfaces;
using FoodOrdering.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrdering.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodItemsController : ControllerBase
    {
        private readonly IFoodItemRepository _repo;
        public FoodItemsController(IFoodItemRepository repo) => _repo = repo;

        [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _repo.GetAllAsync());
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _repo.GetByIdAsync(id);
            return item == null ? NotFound() : Ok(item);
        }
        [HttpGet("search")] public async Task<IActionResult> Search([FromQuery] string q) => Ok(await _repo.SearchAsync(q));
        [HttpGet("featured")] public async Task<IActionResult> Featured() => Ok(await _repo.GetFeaturedAsync());
        [HttpPost] public async Task<IActionResult> Create(FoodItem item) { await _repo.AddAsync(item); return CreatedAtAction(nameof(GetById), new { id = item.Id }, item); }
        [HttpPut("{id}")] public async Task<IActionResult> Update(int id, FoodItem item) { item.Id = id; await _repo.UpdateAsync(item); return NoContent(); }
        [HttpDelete("{id}")] public async Task<IActionResult> Delete(int id) { await _repo.DeleteAsync(id); return NoContent(); }
    }
}