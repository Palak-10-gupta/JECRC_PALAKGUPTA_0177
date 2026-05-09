using FoodOrdering.Core.Interfaces;
using FoodOrdering.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FoodOrdering.Web.Controllers
{
    [Authorize]
    public class OrderController : Controller
    {
        private readonly IOrderRepository _orderRepo;
        private readonly IFoodItemRepository _foodRepo;
        private readonly UserManager<ApplicationUser> _userManager;
        private const string CartKey = "ShoppingCart";

        public OrderController(IOrderRepository orderRepo, IFoodItemRepository foodRepo,
            UserManager<ApplicationUser> userManager)
        {
            _orderRepo = orderRepo;
            _foodRepo = foodRepo;
            _userManager = userManager;
        }

        private List<CartItem> GetCart()
        {
            var json = HttpContext.Session.GetString(CartKey);
            return json == null ? new List<CartItem>() : JsonConvert.DeserializeObject<List<CartItem>>(json)!;
        }

        [HttpGet]
        public IActionResult Checkout()
        {
            var cart = GetCart();
            if (!cart.Any()) return RedirectToAction("Index", "Cart");
            ViewBag.Cart = cart;
            ViewBag.Total = cart.Sum(c => c.Subtotal);
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> PlaceOrder(string deliveryAddress, string? notes, string paymentMethod)
        {
            var cart = GetCart();
            if (!cart.Any()) return RedirectToAction("Index", "Cart");

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var order = new Order
            {
                UserId = user.Id,
                DeliveryAddress = deliveryAddress,
                Notes = notes,
                PaymentMethod = paymentMethod,
                TotalAmount = cart.Sum(c => c.Subtotal),
                OrderItems = cart.Select(c => new OrderItem
                {
                    FoodItemId = c.FoodItemId,
                    Quantity = c.Quantity,
                    UnitPrice = c.Price
                }).ToList()
            };

            var created = await _orderRepo.CreateAsync(order);
            HttpContext.Session.Remove(CartKey);
            TempData["Success"] = "Order placed successfully!";
            return RedirectToAction("OrderConfirmation", new { id = created.Id });
        }

        public async Task<IActionResult> OrderConfirmation(int id)
        {
            var order = await _orderRepo.GetByIdAsync(id);
            return View(order);
        }

        public async Task<IActionResult> History()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized();
            var orders = await _orderRepo.GetByUserIdAsync(user.Id);
            return View(orders);
        }

        public async Task<IActionResult> Details(int id)
        {
            var order = await _orderRepo.GetByIdAsync(id);
            if (order == null) return NotFound();
            return View(order);
        }

        public async Task<IActionResult> GenerateInvoice(int id)
        {
            var order = await _orderRepo.GetByIdAsync(id);
            if (order == null) return NotFound();

            // Simple text invoice (or use iTextSharp for PDF)
            var content = $"INVOICE\nOrder #{order.Id}\nDate: {order.OrderDate:dd/MM/yyyy}\n\n";
            foreach (var item in order.OrderItems)
                content += $"{item.FoodItem.Name} x{item.Quantity} = ₹{item.Subtotal}\n";
            content += $"\nTOTAL: ₹{order.TotalAmount}\nThank you!";

            return File(System.Text.Encoding.UTF8.GetBytes(content), "text/plain", $"Invoice_{id}.txt");
        }
        public async Task<IActionResult> GeneratePdfInvoice(int id)
        {
            var order = await _orderRepo.GetByIdAsync(id);
            if (order == null) return NotFound();

            using var ms = new MemoryStream();
            var document = new iTextSharp.text.Document();
            iTextSharp.text.pdf.PdfWriter.GetInstance(document, ms);
            document.Open();

            document.Add(new iTextSharp.text.Paragraph($"INVOICE - Order #{order.Id}"));
            document.Add(new iTextSharp.text.Paragraph($"Date: {order.OrderDate:dd/MM/yyyy}"));
            document.Add(new iTextSharp.text.Paragraph($"Customer: {order.User?.FullName}"));
            document.Add(new iTextSharp.text.Paragraph("------------------------------------"));

            foreach (var item in order.OrderItems)
                document.Add(new iTextSharp.text.Paragraph($"{item.FoodItem.Name} x{item.Quantity} = ₹{item.Subtotal:F2}"));

            document.Add(new iTextSharp.text.Paragraph("------------------------------------"));
            document.Add(new iTextSharp.text.Paragraph($"TOTAL: ₹{order.TotalAmount:F2}"));
            document.Close();

            return File(ms.ToArray(), "application/pdf", $"Invoice_{id}.pdf");
        }
    }
}