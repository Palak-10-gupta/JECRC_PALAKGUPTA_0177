using EmployeePortal.Models.dto;
using EmployeePortal.Models.entities;
using EmployeePortal_BE.services;

namespace EmployeePortal_BE.services.impl
{
    public class EmployeeService : IEmployeeService
    {
        private static List<Employee> employees = new List<Employee>();

        public EmployeeResponseDto createEmployee(CreateEmployeeDto dto)
        {
            var employee = new Employee()
            {
                Id = Guid.NewGuid(),
                Name = dto.name,
                Email = dto.email,
                Department = dto.department,
                Password = dto.password,
                Phone = dto.phone,
                Salary = dto.salary,
                Address = dto.address
            };

            employees.Add(employee);

            return new EmployeeResponseDto
            {
                Id = employee.Id,
                Name = employee.Name,
                Email = employee.Email,
                Department = employee.Department,
                Phone = employee.Phone,
                Address = employee.Address
            };
        }

        public List<EmployeeResponseDto> GetAllEmployees()
        {
            return employees.Select(e => new EmployeeResponseDto
            {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                Department = e.Department,
                Phone = e.Phone,
                Address = e.Address
            }).ToList();
        }

        public EmployeeResponseDto GetById(Guid id)
        {
            var employee = employees.FirstOrDefault(e => e.Id == id);

            if (employee == null)
                return null;

            return new EmployeeResponseDto
            {
                Id = employee.Id,
                Name = employee.Name,
                Email = employee.Email,
                Department = employee.Department,
                Phone = employee.Phone,
                Address = employee.Address
            };
        }
    }
}