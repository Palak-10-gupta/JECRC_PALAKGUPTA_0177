using FoodOrdering.Core.Interfaces;
using FoodOrdering.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FoodOrdering.Web.Controllers
{
    [Authorize(Roles = "Admin")]
    public class AdminController : Controller
    {
        private readonly IFoodItemRepository _foodRepo;
        private readonly ICategoryRepository _categoryRepo;
        private readonly IOrderRepository _orderRepo;
        private readonly IWebHostEnvironment _env;

        public AdminController(IFoodItemRepository foodRepo, ICategoryRepository categoryRepo,
            IOrderRepository orderRepo, IWebHostEnvironment env)
        {
            _foodRepo = foodRepo;
            _categoryRepo = categoryRepo;
            _orderRepo = orderRepo;
            _env = env;
        }

        public async Task<IActionResult> Dashboard()
        {
            var orders = await _orderRepo.GetAllAsync();
            var foods = await _foodRepo.GetAllAsync();
            ViewBag.TotalOrders = orders.Count();
            ViewBag.PendingOrders = orders.Count(o => o.Status == OrderStatus.Pending);
            ViewBag.TotalRevenue = orders.Where(o => o.Status == OrderStatus.Delivered).Sum(o => o.TotalAmount);
            ViewBag.TotalFoodItems = foods.Count();
            return View();
        }

        // ========= FOOD ITEMS =========
        public async Task<IActionResult> FoodItems()
        {
            var items = await _foodRepo.GetAllAsync();
            return View(items);
        }

        [HttpGet]
        public async Task<IActionResult> CreateFood()
        {
            ViewBag.Categories = new SelectList(await _categoryRepo.GetAllAsync(), "Id", "Name");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateFood(FoodItem model, IFormFile? imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "foods");
                Directory.CreateDirectory(uploadsFolder);
                var fileName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                await imageFile.CopyToAsync(stream);
                model.ImageUrl = "/uploads/foods/" + fileName;
            }

            await _foodRepo.AddAsync(model);
            TempData["Success"] = "Food item added successfully!";
            return RedirectToAction(nameof(FoodItems));
        }

        [HttpGet]
        public async Task<IActionResult> EditFood(int id)
        {
            var item = await _foodRepo.GetByIdAsync(id);
            if (item == null) return NotFound();
            ViewBag.Categories = new SelectList(await _categoryRepo.GetAllAsync(), "Id", "Name", item.CategoryId);
            return View(item);
        }

        [HttpPost]
        public async Task<IActionResult> EditFood(FoodItem model, IFormFile? imageFile)
        {
            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "foods");
                Directory.CreateDirectory(uploadsFolder);
                var fileName = Guid.NewGuid() + Path.GetExtension(imageFile.FileName);
                var filePath = Path.Combine(uploadsFolder, fileName);
                using var stream = new FileStream(filePath, FileMode.Create);
                await imageFile.CopyToAsync(stream);
                model.ImageUrl = "/uploads/foods/" + fileName;
            }

            await _foodRepo.UpdateAsync(model);
            TempData["Success"] = "Food item updated successfully!";
            return RedirectToAction(nameof(FoodItems));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteFood(int id)
        {
            await _foodRepo.DeleteAsync(id);
            TempData["Success"] = "Food item deleted.";
            return RedirectToAction(nameof(FoodItems));
        }

        // ========= CATEGORIES =========
        public async Task<IActionResult> Categories()
        {
            var cats = await _categoryRepo.GetAllAsync();
            return View(cats);
        }

        [HttpGet] public IActionResult CreateCategory() => View();

        [HttpPost]
        public async Task<IActionResult> CreateCategory(Category model)
        {
            await _categoryRepo.AddAsync(model);
            TempData["Success"] = "Category added!";
            return RedirectToAction(nameof(Categories));
        }

        [HttpGet]
        public async Task<IActionResult> EditCategory(int id)
        {
            var cat = await _categoryRepo.GetByIdAsync(id);
            if (cat == null) return NotFound();
            return View(cat);
        }

        [HttpPost]
        public async Task<IActionResult> EditCategory(Category model)
        {
            await _categoryRepo.UpdateAsync(model);
            TempData["Success"] = "Category updated!";
            return RedirectToAction(nameof(Categories));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            await _categoryRepo.DeleteAsync(id);
            return RedirectToAction(nameof(Categories));
        }

        // ========= ORDERS =========
        public async Task<IActionResult> Orders()
        {
            var orders = await _orderRepo.GetAllAsync();
            return View(orders);
        }

        public async Task<IActionResult> OrderDetails(int id)
        {
            var order = await _orderRepo.GetByIdAsync(id);
            if (order == null) return NotFound();
            return View(order);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, OrderStatus status)
        {
            await _orderRepo.UpdateStatusAsync(orderId, status);
            TempData["Success"] = "Order status updated!";
            return RedirectToAction(nameof(Orders));
        }
    }
}