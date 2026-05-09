using FoodOrdering.Core.Interfaces;
using FoodOrdering.Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrdering.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _repo;
        public OrdersController(IOrderRepository repo) => _repo = repo;

        [HttpGet] public async Task<IActionResult> GetAll() => Ok(await _repo.GetAllAsync());
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var order = await _repo.GetByIdAsync(id);
            return order == null ? NotFound() : Ok(order);
        }
        [HttpGet("user/{userId}")] public async Task<IActionResult> GetByUser(string userId) => Ok(await _repo.GetByUserIdAsync(userId));
        [HttpPost] public async Task<IActionResult> Create(Order order) { var created = await _repo.CreateAsync(order); return CreatedAtAction(nameof(GetById), new { id = created.Id }, created); }
        [HttpPatch("{id}/status")] public async Task<IActionResult> UpdateStatus(int id, [FromBody] OrderStatus status) { await _repo.UpdateStatusAsync(id, status); return NoContent(); }
    }
}