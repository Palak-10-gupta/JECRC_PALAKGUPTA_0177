using FoodOrdering.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FoodOrdering.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IFoodItemRepository _foodRepo;
        private readonly ICategoryRepository _categoryRepo;

        public HomeController(IFoodItemRepository foodRepo, ICategoryRepository categoryRepo)
        {
            _foodRepo = foodRepo;
            _categoryRepo = categoryRepo;
        }

        public async Task<IActionResult> Index()
        {
            ViewBag.FeaturedItems = await _foodRepo.GetFeaturedAsync();
            ViewBag.Categories = await _categoryRepo.GetAllAsync();
            return View();
        }
    }
}