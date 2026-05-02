using Microsoft.AspNetCore.Mvc;
using EMPS_mvcApplication.Models;
using EMPS_mvcApplication.Services;

namespace EMPS_mvcApplication.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApiService _api;

        public HomeController(ApiService api)
        {
            _api = api;
        }

        public async Task<IActionResult> Index()
        {
            var employees = await _api.GetEmployees();
            return View(employees);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Employee emp)
        {
            await _api.AddEmployee(emp);
            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Edit(int id)
        {
            var emp = await _api.GetEmployeeById(id);
            return View(emp);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(int id, Employee emp)
        {
            await _api.UpdateEmployee(id, emp);
            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Delete(int id)
        {
            await _api.DeleteEmployee(id);
            return RedirectToAction("Index");
        }
    }
}