using EmployeePortal.Models.dto;
using EmployeePortal.Models.entities;
using Microsoft.AspNetCore.Mvc;

namespace EmployeePortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private static List<Employee> employees = new List<Employee>();

        // POST: Create Employee
        [HttpPost]
        public IActionResult CreateEmployee(CreateEmployeeDto createEmployeeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var employee = new Employee()
            {
                Id = Guid.NewGuid(),
                Name = createEmployeeDto.name,
                Email = createEmployeeDto.email,
                Department = createEmployeeDto.department,
                Password = createEmployeeDto.password,
                Phone = createEmployeeDto.phone,
                Salary = createEmployeeDto.salary,
                Address = createEmployeeDto.address
            };

            employees.Add(employee);

            var response = new EmployeeResponseDto
            {
                Id = employee.Id,
                Address = employee.Address,
                Department = employee.Department,
                Email = employee.Email,
                Name = employee.Name,
                Phone = employee.Phone
            };

            // ✅ Correct RESTful response
            return CreatedAtAction(
                nameof(GetEmployeeById),   // where to redirect
                new { id = employee.Id }, // route values
                response                  // what to return
            );
        }

        // GET: All Employees
        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var responseList = employees.Select(e => new EmployeeResponseDto
            {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                Department = e.Department,
                Phone = e.Phone,
                Address = e.Address
            }).ToList();

            return Ok(responseList);
        }

        // GET: Employee by ID
        [HttpGet("{id:guid}")]
        public IActionResult GetEmployeeById(Guid id)
        {
            var employee = employees.FirstOrDefault(e => e.Id == id);

            if (employee == null)
                return NotFound("Employee with given Id does not exist");

            var response = new EmployeeResponseDto
            {
                Id = employee.Id,
                Name = employee.Name,
                Email = employee.Email,
                Department = employee.Department,
                Phone = employee.Phone,
                Address = employee.Address
            };

            return Ok(response);
        }
    }
}