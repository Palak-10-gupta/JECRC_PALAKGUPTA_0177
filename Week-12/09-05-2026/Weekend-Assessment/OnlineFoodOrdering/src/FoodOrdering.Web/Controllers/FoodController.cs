using FoodOrdering.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrdering.Web.Controllers
{
    public class FoodController : Controller
    {
        private readonly IFoodItemRepository _foodRepo;
        private readonly ICategoryRepository _categoryRepo;

        public FoodController(IFoodItemRepository foodRepo, ICategoryRepository categoryRepo)
        {
            _foodRepo = foodRepo;
            _categoryRepo = categoryRepo;
        }

        public async Task<IActionResult> Index(int? categoryId, string? search)
        {
            ViewBag.Categories = await _categoryRepo.GetAllAsync();
            ViewBag.SelectedCategory = categoryId;
            ViewBag.Search = search;

            var items = !string.IsNullOrWhiteSpace(search)
                ? await _foodRepo.SearchAsync(search)
                : categoryId.HasValue
                    ? await _foodRepo.GetByCategoryAsync(categoryId.Value)
                    : await _foodRepo.GetAllAsync();

            return View(items.Where(f => f.IsAvailable));
        }

        public async Task<IActionResult> Details(int id)
        {
            var item = await _foodRepo.GetByIdAsync(id);
            if (item == null) return NotFound();
            return View(item);
        }
    }
}