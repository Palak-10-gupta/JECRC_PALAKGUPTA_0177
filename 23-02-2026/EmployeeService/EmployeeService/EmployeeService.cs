using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.Data.SqlClient;


namespace Employee_Management
{
    internal class EmployeeService
    {
        private readonly string connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=SQL_TRAINING;Integrated Security=True";

        public void Run()
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine("===Employee management System====");
                Console.WriteLine("1. View All Employees");
                Console.WriteLine("2. Insert Employee");
                Console.WriteLine("3. Update Employee");
                Console.WriteLine("4. Delete Employee");
                Console.WriteLine("5. Search by Employee Id");
                Console.WriteLine("6. Search by Department Name");
                Console.WriteLine("7. Exit ");
                Console.WriteLine("Enter the Choice: ");
                int choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1: break;
                    case 2: break;
                    case 3: break;
                    case 4: break;
                    case 5: break;
                    case 6: break;
                    case 7: break;
                    default:
                        Console.WriteLine("Invalid Choice");
                        break;

                }
                Console.WriteLine("/n Press Enter to Continue...");
                Console.ReadLine();

            }

        }
        public void ViewEmployees()
        {
            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            string query = "SELECT Id, Name, Department, Salary FROM Employees";
            using SqlCommand cmd = new SqlCommand(query, conn);
            using SqlDataReader reader = cmd.ExecuteReader();
            Console.WriteLine("Employee List---");
            while (reader.Read())
            {
                Console.WriteLine()
            }
        }
        public void InsertEmployee()
        {
            Console.WriteLine("Enter Employee Name");

        }
    }
}