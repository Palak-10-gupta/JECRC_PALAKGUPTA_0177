using System;

class Employee
{
    public int EmployeeId;
    public string Name;
    public int Experience;
    public double Salary;
    public int PerformanceRating;
}

class PromotionEngine
{
    public void Validate(Employee emp, string department, Predicate<Employee> rule)
    {
        bool result = rule(emp);

        Console.WriteLine("========= PROMOTION VALIDATION =========");
        Console.WriteLine("Employee Name : " + emp.Name);
        Console.WriteLine("Department    : " + department);
        Console.WriteLine("Eligible      : " + result);
        Console.WriteLine("--------------------------------------");
        Console.WriteLine();
    }
}

class Program
{
    static void Main()
    {
        Employee emp = new Employee
        {
            EmployeeId = 501,
            Name = "Ravi",
            Experience = 5,
            Salary = 65000,
            PerformanceRating = 4
        };

        Predicate<Employee> techRule = e => e.Experience >= 3;
        Predicate<Employee> hrRule = e => e.Experience >= 2 && e.PerformanceRating >= 4;
        Predicate<Employee> mgmtRule = e => e.Experience >= 5 && e.Salary >= 60000;

        PromotionEngine engine = new PromotionEngine();

        engine.Validate(emp, "Technical", techRule);
        engine.Validate(emp, "HR", hrRule);
        engine.Validate(emp, "Management", mgmtRule);
    }
}