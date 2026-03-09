using System;
using System.Collections.Generic;
using System.Linq;

class Employee
{
    public int EmployeeId { get; set; }
    public string Name { get; set; }
    public double Salary { get; set; }
}

class AnalyticsEngine
{
    private List<Employee> employees;

    public AnalyticsEngine(List<Employee> employees)
    {
        this.employees = employees;
    }

    public void HighSalary()
    {
        Console.WriteLine("High Salary Employees:");

        employees.Where(e => e.Salary >= 50000)
                 .Select(e => e.Name)
                 .ToList()
                 .ForEach(Console.WriteLine);
    }

    public void SortedSalary()
    {
        Console.WriteLine();
        Console.WriteLine("Employees Sorted by Salary:");

        employees.OrderByDescending(e => e.Salary)
                 .ToList()
                 .ForEach(e => Console.WriteLine(e.Name + " - " + e.Salary));
    }

    public void AverageSalary()
    {
        Console.WriteLine();
        Console.WriteLine("Average Salary:");
        Console.WriteLine("Rs " + (int)employees.Average(e => e.Salary));
    }
}

class Program
{
    static void Main()
    {
        List<Employee> employees = new List<Employee>
        {
            new Employee{EmployeeId=301, Name="Ramesh", Salary=45000},
            new Employee{EmployeeId=302, Name="Suresh", Salary=52000},
            new Employee{EmployeeId=303, Name="Kavya", Salary=68000},
            new Employee{EmployeeId=304, Name="Anita", Salary=39000}
        };

        AnalyticsEngine engine = new AnalyticsEngine(employees);

        engine.HighSalary();
        engine.SortedSalary();
        engine.AverageSalary();
        Console.WriteLine();
    }
}