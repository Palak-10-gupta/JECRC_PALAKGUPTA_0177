//Combination of single, multiple and multilevel inheritance gives me hybrid inheritance.

namespace InheritanceDemo
{
    public class Person
    {
        private string name;
        private int age;

        public void GetInformation()
        {
            Console.WriteLine("Enter your Name");
            name = Console.ReadLine();
            age = int.Parse(Console.ReadLine());
        }
        public void DisplayInformation()
            {
            Console.WriteLine("Welcome to .Net Training Mr/Ms {0}, and your age is {1}",name,age);
        }
    }
public class Employee:Person
    {
        private string Companyname;
        private int EmployeeID;
        private int EmployeeScore;
        public int GetEmployeeInformation()
        {
            Console.WriteLine("Enter your Company Name");
            Companyname = Console.ReadLine();
            EmployeeID = int.Parse(Console.ReadLine());
            EmployeeScore = int.Parse(Console.ReadLine());
            return EmployeeScore;
            
        }
        public void DisplayEmployeeInformation()
        {
            Console.WriteLine("Welcome to this Company {0}, your Employee ID is {1} and your Employee Score is {2}", Companyname, EmployeeID, EmployeeScore);
        }
    }
    interface IDepartment
    {
        string DepartmentName { get; set; }
        void DisplayDepartmentDetails();
    }
    public class EmployeeGradeLevel:Employee, IDepartment
    {
        public string DepartmentName { get; set; }
        public void CheckEligible()
        {
            Console.WriteLine("Every employee should have about 150");
            if(this.GetEmployeeInformation()>150)
            {
                Console.WriteLine("You are eligible");
            }
            else
            {
                Console.WriteLine("You are not eligible");
            }
        }

        public void DisplayDepartmentDetails()
        {
            Console.WriteLine("Department Name: {0}",DepartmentName);
        }
    }
    public class TestProgram
    {
        static void Main(string[] args)
        {
            EmployeeGradeLevel Cap = new EmployeeGradeLevel();
            Cap.GetInformation();
            Cap.DisplayInformation();
           // Cap.GetEmployeeInformation();
            //Cap.DisplayEmployeeInformation();
            Cap.DepartmentName = "IT";
            Cap.CheckEligible();
            Cap.DisplayDepartmentDetails();
        }
    }
}