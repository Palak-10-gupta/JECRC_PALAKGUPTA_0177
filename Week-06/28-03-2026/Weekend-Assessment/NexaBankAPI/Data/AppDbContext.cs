using Microsoft.EntityFrameworkCore;
using NexaBankAPI.Models;

namespace NexaBankAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // This maps to the Transactions table in NexaBankDB
        public DbSet<Transaction> Transactions { get; set; }
    }
}