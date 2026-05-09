using FoodOrdering.Core.Models;

namespace FoodOrdering.Core.Interfaces
{
    public interface IFoodItemRepository
    {
        Task<IEnumerable<FoodItem>> GetAllAsync();
        Task<IEnumerable<FoodItem>> GetByCategoryAsync(int categoryId);
        Task<IEnumerable<FoodItem>> SearchAsync(string query);
        Task<FoodItem?> GetByIdAsync(int id);
        Task AddAsync(FoodItem item);
        Task UpdateAsync(FoodItem item);
        Task DeleteAsync(int id);
        Task<IEnumerable<FoodItem>> GetFeaturedAsync();
    }
}