using FoodOrdering.Core.Models;

namespace FoodOrdering.Core.Interfaces
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllAsync();
        Task<IEnumerable<Order>> GetByUserIdAsync(string userId);
        Task<Order?> GetByIdAsync(int id);
        Task<Order> CreateAsync(Order order);
        Task UpdateStatusAsync(int orderId, OrderStatus status);
    }
}