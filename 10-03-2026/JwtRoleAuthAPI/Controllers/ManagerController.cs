using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace JwtRoleAuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ManagerController : ControllerBase
    {
        // This endpoint is protected and can only be accessed by users with the "Manager" role
        [HttpGet("dashboard")]
        [Authorize(Roles = "Manager")]
        public IActionResult GetManagerDashboard()
        {
            return Ok("Welcome to the Manager Dashboard! Only users with the Manager role can see this.");
        }
        [HttpGet("reports")]
        [Authorize(Roles = "Admin,Manager")]
        public IActionResult GetReports()
        {
            return Ok("Welcome to the Admin and Manager Reports! Only users with the Admin and Manager acn see this");
        }
    }
}