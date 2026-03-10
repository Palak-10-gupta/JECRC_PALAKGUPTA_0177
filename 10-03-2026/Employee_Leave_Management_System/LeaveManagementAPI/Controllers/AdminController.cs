using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LeaveManagementAPI.Data;
using LeaveManagementAPI.Models;
using System.Linq;

namespace LeaveManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/employees
        [HttpGet("employees")]
        public IActionResult GetEmployees()
        {
            var employees = _context.Users
                .Where(u => u.Role == "Employee")
                .ToList();

            return Ok(employees);
        }

        // DELETE: api/admin/delete/5
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound("User not found");
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return Ok("Employee deleted successfully");
        }
    }
}