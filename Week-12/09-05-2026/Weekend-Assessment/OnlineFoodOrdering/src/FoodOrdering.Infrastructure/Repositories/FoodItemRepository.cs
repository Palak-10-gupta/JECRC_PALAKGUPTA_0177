using FoodOrdering.Core.Interfaces;
using FoodOrdering.Core.Models;
using FoodOrdering.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Infrastructure.Repositories
{
    public class FoodItemRepository : IFoodItemRepository
    {
        private readonly ApplicationDbContext _context;
        public FoodItemRepository(ApplicationDbContext context) => _context = context;

        public async Task<IEnumerable<FoodItem>> GetAllAsync() =>
            await _context.FoodItems.Include(f => f.Category).ToListAsync();

        public async Task<IEnumerable<FoodItem>> GetByCategoryAsync(int categoryId) =>
            await _context.FoodItems.Include(f => f.Category)
                .Where(f => f.CategoryId == categoryId && f.IsAvailable).ToListAsync();

        public async Task<IEnumerable<FoodItem>> SearchAsync(string query) =>
            await _context.FoodItems.Include(f => f.Category)
                .Where(f => f.Name.Contains(query) || (f.Description != null && f.Description.Contains(query)))
                .ToListAsync();

        public async Task<FoodItem?> GetByIdAsync(int id) =>
            await _context.FoodItems.Include(f => f.Category).FirstOrDefaultAsync(f => f.Id == id);

        public async Task AddAsync(FoodItem item)
        {
            _context.FoodItems.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(FoodItem item)
        {
            _context.FoodItems.Update(item);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var item = await _context.FoodItems.FindAsync(id);
            if (item != null)
            {
                _context.FoodItems.Remove(item);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<FoodItem>> GetFeaturedAsync() =>
            await _context.FoodItems.Include(f => f.Category)
                .Where(f => f.IsFeatured && f.IsAvailable).ToListAsync();
    }
}