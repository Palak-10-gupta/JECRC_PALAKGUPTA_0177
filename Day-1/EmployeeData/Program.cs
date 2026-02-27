// See https://aka.ms/new-console-template for more information
using System;
namespace ConsoleApp
{
    class Employee
    {
        public string Name { get; set; }
        public int ID { get; set; }
        public string Department { get; set; }
        public double Salary { get; set; }
        public string Position { get; set; }
        public DateTime DateOfJoining { get; set; }
        public void GetEmployeeData()
        {
            Console.WriteLine("Enter Employee Name:");
            Name = Console.ReadLine();
            Console.WriteLine("Enter Employee ID:");
            ID = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Employee Department:");
            Department = Console.ReadLine();
            Console.WriteLine("Enter Employee Salary:");
            Salary = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine("Enter Employee Position:");
            Position = Console.ReadLine();
            Console.WriteLine("Enter Employee DateOfJoining:");
            DateOfJoining = Convert.ToDateTime(Console.ReadLine());
        }
        public void DisplayEmployeeData()
        {
            Console.WriteLine($"Employee Name: {Name}");
            Console.WriteLine($"Employee ID: {ID}");
            Console.WriteLine($"Employee Department: {Department}");
            Console.WriteLine($"Employee Salary: {Salary}");
            Console.WriteLine($"Employee Position: {Position}");
            Console.WriteLine($"Employee DateOfJoining: {DateOfJoining.ToShortDateString}");
            
        }
    }
class Program
{
    static void Main(string[] args)
    {
        Employee emp = new Employee();
        emp.GetEmployeeData();
        emp.DisplayEmployeeData();
    }
}
}
