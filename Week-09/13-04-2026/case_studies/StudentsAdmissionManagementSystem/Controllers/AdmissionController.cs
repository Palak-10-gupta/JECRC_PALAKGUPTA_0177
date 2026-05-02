using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentsAdmissionManagementSystem.Model;

namespace StudentsAdmissionManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdmissionController : ControllerBase
    {
        private static List<Admission> admissions = new();

        [HttpGet]
        public ActionResult Get() => Ok(admissions);

        [HttpPost]
        public IActionResult Add(Admission admission)
        {
            admissions.Add(admission);
            return Ok(admission);

        }

    }
}
