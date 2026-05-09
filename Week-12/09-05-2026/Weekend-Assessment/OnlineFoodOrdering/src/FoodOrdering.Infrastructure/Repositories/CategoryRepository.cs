using FoodOrdering.Core.Interfaces;
using FoodOrdering.Core.Models;
using FoodOrdering.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context) => _context = context;

        public async Task<IEnumerable<Category>> GetAllAsync() =>
            await _context.Categories.Where(c => c.IsActive).ToListAsync();

        public async Task<Category?> GetByIdAsync(int id) =>
            await _context.Categories.FindAsync(id);

        public async Task AddAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Category category)
        {
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var cat = await _context.Categories.FindAsync(id);
            if (cat != null)
            {
                cat.IsActive = false; // soft delete
                await _context.SaveChangesAsync();
            }
        }
    }
}