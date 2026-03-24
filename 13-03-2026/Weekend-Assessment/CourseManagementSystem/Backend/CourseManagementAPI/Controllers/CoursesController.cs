using Microsoft.AspNetCore.Mvc;
using CourseManagementAPI.Data;
using CourseManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CoursesController(AppDbContext context)
        {
            _context = context;
        }

        // =========================
        // GET ALL COURSES
        // =========================
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            return Ok(await _context.Courses.ToListAsync());
        }

        // =========================
        // GET COURSE BY ID
        // =========================
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
                return NotFound(new { message = "Course not found" });

            return Ok(course);
        }

        // =========================
        // ADD COURSE
        // =========================
        [HttpPost]
        public async Task<ActionResult> AddCourse(Course course)
        {
            if (string.IsNullOrEmpty(course.CourseName))
                return BadRequest(new { message = "Course name required" });

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Course Added Successfully",
                data = course
            });
        }

        // =========================
        // UPDATE COURSE
        // =========================
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourse(int id, Course course)
        {
            var existing = await _context.Courses.FindAsync(id);

            if (existing == null)
                return NotFound(new { message = "Course not found" });

            existing.CourseName = course.CourseName;
            existing.DepartmentId = course.DepartmentId;
            existing.Credits = course.Credits;
            existing.SeatsAvailable = course.SeatsAvailable;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Course Updated" });
        }

        // =========================
        // DELETE COURSE (HARD DELETE)
        // =========================
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
                return NotFound(new { message = "Course not found" });

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Course Deleted" });
        }
    }
}