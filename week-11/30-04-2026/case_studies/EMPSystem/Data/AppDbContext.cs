using EMPSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EMPSystem.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) // ✅ FIX
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
    }
}