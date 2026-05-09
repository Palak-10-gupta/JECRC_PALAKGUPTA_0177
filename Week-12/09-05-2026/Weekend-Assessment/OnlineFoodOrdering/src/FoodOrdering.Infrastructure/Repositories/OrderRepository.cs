using FoodOrdering.Core.Interfaces;
using FoodOrdering.Core.Models;
using FoodOrdering.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Infrastructure.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;
        public OrderRepository(ApplicationDbContext context) => _context = context;

        public async Task<IEnumerable<Order>> GetAllAsync() =>
            await _context.Orders.Include(o => o.User).Include(o => o.OrderItems)
                .ThenInclude(oi => oi.FoodItem).OrderByDescending(o => o.OrderDate).ToListAsync();

        public async Task<IEnumerable<Order>> GetByUserIdAsync(string userId) =>
            await _context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.FoodItem)
                .Where(o => o.UserId == userId).OrderByDescending(o => o.OrderDate).ToListAsync();

        public async Task<Order?> GetByIdAsync(int id) =>
            await _context.Orders.Include(o => o.User).Include(o => o.OrderItems)
                .ThenInclude(oi => oi.FoodItem).FirstOrDefaultAsync(o => o.Id == id);

        public async Task<Order> CreateAsync(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task UpdateStatusAsync(int orderId, OrderStatus status)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order != null)
            {
                order.Status = status;
                await _context.SaveChangesAsync();
            }
        }
    }
}