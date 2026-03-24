using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseManagementAPI.Data;

namespace CourseManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // ================= LOGIN =================
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.Email.ToLower() == login.Email.ToLower() &&
                x.Password == login.Password &&
                x.Role.ToLower() == login.Role.ToLower());

            if (user == null)
                return Unauthorized("Invalid email / password / role");

            return Ok(new
            {
                user.UserId,
                user.Name,
                user.Email,
                user.Role
            });
        }
    }

    // ⭐ SIMPLE DTO inside same file (no extra class file needed)
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}