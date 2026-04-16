using EmployeePortal.Models.dto;

namespace EmployeePortal_BE.services
{
    public interface IEmployeeService
    {
        EmployeeResponseDto createEmployee(CreateEmployeeDto createEmployeeDto);
        EmployeeResponseDto GetById(Guid guid);
        List<EmployeeResponseDto> GetAllEmployees();


    }
}
