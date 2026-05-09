using FoodOrdering.Core.Interfaces;
using FoodOrdering.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FoodOrdering.Web.Controllers
{
    public class CartController : Controller
    {
        private readonly IFoodItemRepository _foodRepo;
        private const string CartKey = "ShoppingCart";

        public CartController(IFoodItemRepository foodRepo) => _foodRepo = foodRepo;

        private List<CartItem> GetCart()
        {
            var json = HttpContext.Session.GetString(CartKey);
            return json == null ? new List<CartItem>() : JsonConvert.DeserializeObject<List<CartItem>>(json)!;
        }

        private void SaveCart(List<CartItem> cart) =>
            HttpContext.Session.SetString(CartKey, JsonConvert.SerializeObject(cart));

        public IActionResult Index()
        {
            var cart = GetCart();
            ViewBag.Total = cart.Sum(c => c.Subtotal);
            return View(cart);
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart(int foodItemId, int quantity = 1)
        {
            var food = await _foodRepo.GetByIdAsync(foodItemId);
            if (food == null) return NotFound();

            var cart = GetCart();
            var existing = cart.FirstOrDefault(c => c.FoodItemId == foodItemId);

            if (existing != null)
                existing.Quantity += quantity;
            else
                cart.Add(new CartItem
                {
                    FoodItemId = food.Id,
                    Name = food.Name,
                    Price = food.Price,
                    Quantity = quantity,
                    ImageUrl = food.ImageUrl
                });

            SaveCart(cart);
            TempData["CartMessage"] = $"{food.Name} added to cart!";
            return RedirectToAction("Index", "Food");
        }

        [HttpPost]
        public IActionResult RemoveFromCart(int foodItemId)
        {
            var cart = GetCart();
            cart.RemoveAll(c => c.FoodItemId == foodItemId);
            SaveCart(cart);
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public IActionResult UpdateQuantity(int foodItemId, int quantity)
        {
            var cart = GetCart();
            var item = cart.FirstOrDefault(c => c.FoodItemId == foodItemId);
            if (item != null)
            {
                if (quantity <= 0) cart.Remove(item);
                else item.Quantity = quantity;
            }
            SaveCart(cart);
            return RedirectToAction(nameof(Index));
        }

        public IActionResult GetCartCount()
        {
            var count = GetCart().Sum(c => c.Quantity);
            return Json(count);
        }
    }
}