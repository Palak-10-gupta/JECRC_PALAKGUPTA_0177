using Microsoft.AspNetCore.Mvc;
using CourseManagementAPI.Data;
using CourseManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EnrollmentsController(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // GET ALL ENROLLMENTS
        // =========================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Enrollment>>> GetEnrollments()
        {
            return Ok(await _context.Enrollments.ToListAsync());
        }

        // =========================
        // ADD ENROLLMENT
        // =========================
        [HttpPost]
        public async Task<ActionResult> AddEnrollment(Enrollment enrollment)
        {
            var course = await _context.Courses.FindAsync(enrollment.CourseId);

            if (course == null)
                return BadRequest(new { message = "Invalid Course" });

            if (!course.SeatsAvailable)
                return BadRequest(new { message = "No Seats Available" });

            enrollment.EnrollmentDate = DateTime.Now;
            enrollment.DropDate = null;

            _context.Enrollments.Add(enrollment);

            // mark seat unavailable
            course.SeatsAvailable = false;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Student Enrolled Successfully" });
        }

        // =========================
        // DROP ENROLLMENT (SOFT DELETE)
        // =========================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DropEnrollment(int id)
        {
            var enroll = await _context.Enrollments.FindAsync(id);

            if (enroll == null)
                return NotFound(new { message = "Enrollment not found" });

            if (enroll.DropDate != null)
                return BadRequest(new { message = "Already Dropped" });

            // ⭐ SOFT DROP
            enroll.DropDate = DateTime.Now;

            var course = await _context.Courses.FindAsync(enroll.CourseId);
            if (course != null)
                course.SeatsAvailable = true;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Enrollment Dropped Successfully" });
        }
    }
}