using Microsoft.EntityFrameworkCore;
using NexaBankAPI.Data;
using NexaBankAPI.Models;

namespace NexaBankAPI.Services
{
    public class TransactionService
    {
        private readonly AppDbContext _context;

        public TransactionService(AppDbContext context)
        {
            _context = context;
        }

        // Returns ALL transactions in the order stored in DB
        // Angular demo shows them in original retrieval order
        public async Task<List<Transaction>> GetAllAsync()
        {
            return await _context.Transactions.ToListAsync();
        }

        // Returns only transactions matching the given date string
        // date format must be YYYY-MM-DD e.g. "2019-12-03"
        public async Task<List<Transaction>> GetByDateAsync(string date)
        {
            return await _context.Transactions
                .Where(t => t.Date == date)
                .ToListAsync();
        }
        public async Task<Transaction> AddAsync(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }
    }
}