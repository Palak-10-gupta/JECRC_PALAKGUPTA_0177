using System.Text;
using System.Text.Json;
using EMPS_mvcApplication.Models;

namespace EMPS_mvcApplication.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;
        private readonly string baseUrl = "http://backend/api/employees";

        public ApiService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<Employee>> GetEmployees()
        {
            var response = await _httpClient.GetStringAsync(baseUrl);
            return JsonSerializer.Deserialize<List<Employee>>(response,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public async Task<Employee> GetEmployeeById(int id)
        {
            var response = await _httpClient.GetStringAsync($"{baseUrl}/{id}");
            return JsonSerializer.Deserialize<Employee>(response,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public async Task AddEmployee(Employee emp)
        {
            var json = JsonSerializer.Serialize(emp);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            await _httpClient.PostAsync(baseUrl, content);
        }

        public async Task UpdateEmployee(int id, Employee emp)
        {
            var json = JsonSerializer.Serialize(emp);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            await _httpClient.PutAsync($"{baseUrl}/{id}", content);
        }

        public async Task DeleteEmployee(int id)
        {
            await _httpClient.DeleteAsync($"{baseUrl}/{id}");
        }
    }
}