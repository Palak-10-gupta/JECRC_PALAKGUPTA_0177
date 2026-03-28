using Microsoft.AspNetCore.Mvc;
using NexaBankAPI.Services;
using NexaBankAPI.Models;

namespace NexaBankAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionService _service;

        public TransactionsController(TransactionService service)
        {
            _service = service;
        }

        // GET: api/transactions
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var transactions = await _service.GetAllAsync();
            return Ok(transactions);
        }

        // GET: api/transactions/filter?date=2019-12-03
        [HttpGet("filter")]
        public async Task<IActionResult> GetByDate([FromQuery] string date)
        {
            if (string.IsNullOrWhiteSpace(date))
                return BadRequest(new { message = "Date parameter is required." });

            var transactions = await _service.GetByDateAsync(date);
            return Ok(transactions);
        }

        // 🔥 FIXED POST (USING SERVICE)
        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody] Transaction transaction)
        {
            if (transaction == null)
                return BadRequest();

            var result = await _service.AddAsync(transaction);
            return Ok(result);
        }
    }
}