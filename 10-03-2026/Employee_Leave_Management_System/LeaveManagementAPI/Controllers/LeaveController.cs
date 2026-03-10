using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LeaveManagementAPI.Data;
using LeaveManagementAPI.Models;
using System.Linq;

namespace LeaveManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveController(AppDbContext context)
        {
            _context = context;
        }

        // Apply Leave
        [Authorize(Roles = "Employee")]
        [HttpPost("apply")]
        public IActionResult ApplyLeave(LeaveRequest leave)
        {
            var username = User.Identity.Name;

            var user = _context.Users.FirstOrDefault(u => u.Username == username);

            if (user == null)
                return Unauthorized();

            leave.EmployeeId = user.Id;
            leave.Status = "Pending";

            _context.LeaveRequests.Add(leave);
            _context.SaveChanges();

            return Ok(leave);
        }

        // View My Leaves
        [Authorize(Roles = "Employee")]
        [HttpGet("my-leaves")]
        public IActionResult GetMyLeaves()
        {
            var username = User.Identity.Name;

            var user = _context.Users.FirstOrDefault(u => u.Username == username);

            if (user == null)
                return Unauthorized();

            var leaves = _context.LeaveRequests
                .Where(l => l.EmployeeId == user.Id)
                .ToList();

            return Ok(leaves);
        }

        // Manager View All Leaves
        [Authorize(Roles = "Manager")]
        [HttpGet("all")]
        public IActionResult GetAllLeaves()
        {
            var leaves = _context.LeaveRequests.ToList();

            return Ok(leaves);
        }

        // Approve Leave
        [Authorize(Roles = "Manager")]
        [HttpPut("approve/{id}")]
        public IActionResult ApproveLeave(int id)
        {
            var leave = _context.LeaveRequests.Find(id);

            if (leave == null)
                return NotFound();

            leave.Status = "Approved";
            _context.SaveChanges();

            return Ok("Leave Approved");
        }

        // Reject Leave
        [Authorize(Roles = "Manager")]
        [HttpPut("reject/{id}")]
        public IActionResult RejectLeave(int id)
        {
            var leave = _context.LeaveRequests.Find(id);

            if (leave == null)
                return NotFound();

            leave.Status = "Rejected";
            _context.SaveChanges();

            return Ok("Leave Rejected");
        }
    }
}