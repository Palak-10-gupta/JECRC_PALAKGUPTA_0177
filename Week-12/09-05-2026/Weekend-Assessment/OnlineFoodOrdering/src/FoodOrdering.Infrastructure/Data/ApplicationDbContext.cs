using FoodOrdering.Core.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FoodOrdering.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<FoodItem>()
                .Property(f => f.Price)
                .HasColumnType("decimal(18,2)");

            builder.Entity<Order>()
                .Property(o => o.TotalAmount)
                .HasColumnType("decimal(18,2)");

            builder.Entity<OrderItem>()
                .Property(oi => oi.UnitPrice)
                .HasColumnType("decimal(18,2)");

            // Seed Categories
            builder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Burgers", Description = "Juicy burgers", IsActive = true },
                new Category { Id = 2, Name = "Pizza", Description = "Wood-fired pizzas", IsActive = true },
                new Category { Id = 3, Name = "Sushi", Description = "Fresh sushi rolls", IsActive = true },
                new Category { Id = 4, Name = "Desserts", Description = "Sweet endings", IsActive = true },
                new Category { Id = 5, Name = "Beverages", Description = "Cold & hot drinks", IsActive = true }
            );
        }
    }
}