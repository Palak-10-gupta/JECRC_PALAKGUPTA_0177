using Microsoft.AspNetCore.Mvc;
using ProductManagement.DTOs;
using ProductManagement.Repositories.Interfaces;

namespace ProductManagement.Controllers
{
    public class ProductsController : Controller
    {
        private readonly IProductRepository _repo;
        public ProductsController(IProductRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _repo.GetAllAsync();
            return View(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _repo.GetByIdAsync(id);
            return data == null? NotFound() : Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductRequestDto dto)
        => Ok(await _repo.CreateAsync(dto));

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ProductRequestDto dto)
        => await _repo.UpdateAsync(id, dto) ? NoContent() : NotFound();

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
            => await _repo.DeleteAsync(id) ? NoContent() : NotFound();
    }
}
