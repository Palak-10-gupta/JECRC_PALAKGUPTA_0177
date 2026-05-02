using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentsAttendanceManagementSystem.Model;

namespace StudentsAttendanceManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private static List<Attendance> attendanceRecords = new();
        [HttpGet]
        public ActionResult Get() => Ok(attendanceRecords);

        [HttpPost]
        public IActionResult Mark(Attendance attendance)
        {
            attendanceRecords.Add(attendance);
            return Ok(attendance);

        }
    }
}
