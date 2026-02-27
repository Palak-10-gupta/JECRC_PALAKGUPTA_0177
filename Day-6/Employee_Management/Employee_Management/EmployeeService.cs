using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Microsoft.Data.SqlClient;

namespace Employee_Management
{
    internal class EmployeeService
    {
        private readonly string connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=EmployeeDB;Integrated Security=True";

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
                    case 1: ViewEmployees(); break;
                    case 2: InsertEmployee(); break;
                    case 3: UpdateEmployee(); break;
                    case 4: DeleteEmployee(); break;
                    case 5: SearchByDept(); break;
                    case 6: SearchById(); break;
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
                Console.WriteLine($"{reader.GetInt32(0)} {reader.GetString(1)} | {reader.GetString(2)} | {reader.GetInt32(3)} ");
            }
        }

        public void InsertEmployee()
        {
            Emp emp = new Emp();

            Console.WriteLine("Enter Employee Name:");
            emp.Name = Console.ReadLine();

            Console.WriteLine("Enter Employee Department:");
            emp.Department = Console.ReadLine();

            Console.WriteLine("Enter Employee Salary:");
            emp.Salary = Convert.ToInt32(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();

            string query = "INSERT INTO Employees (Name, Department, Salary) VALUES (@Name, @Dept, @Salary)";

            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Name", emp.Name);
            cmd.Parameters.AddWithValue("@Dept", emp.Department);
            cmd.Parameters.AddWithValue("@Salary", emp.Salary);

            cmd.ExecuteNonQuery();

            Console.WriteLine("Employee inserted successfully.");
        }
        public void DeleteEmployee()
        {
            Console.WriteLine("Enter Employee ID");
            int Id = Convert.ToInt32(Console.ReadLine());
            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();
            string query = "DELETE FROM Employees WHERE Id=@Id";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", Id);
            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine(rows > 0 ? "Employee Deleted Successfully" : "Employee Not Found");
        }

        public void UpdateEmployee()
        {
            Emp emp = new Emp();
            Console.WriteLine("Enter the Employee ID");
            emp.Id = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Employee Name");
            emp.Name = Console.ReadLine();

            Console.WriteLine("Enter Employee Department");
            emp.Department = Console.ReadLine();

            Console.WriteLine("Enter Employee Salary");
            emp.Salary = Convert.ToInt32(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();

            string query = "UPDATE Employees " +
                           "SET Name=@Name,Department=@Department,Salary=@Salary " +
                           "WHERE Id=@Id";

            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Name", emp.Name);
            cmd.Parameters.AddWithValue("@Department", emp.Department);
            cmd.Parameters.AddWithValue("@Salary", emp.Salary);
            cmd.Parameters.AddWithValue("@Id", emp.Id);
            int rows = cmd.ExecuteNonQuery();
            Console.WriteLine(rows > 0 ? "Employee Updated Succesfully" : "Employee Not Found");
        }
        public void SearchById()
        { 

            Console.WriteLine("Enter Employee ID");
            int Id = Convert.ToInt32(Console.ReadLine());

            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();

            string query = "SELECT Id, Name, Department, Salary FROM Employees WHERE Id=@Id";

            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Id", Id);

            using SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read()) Console.WriteLine($"{reader.GetInt32(0)} | {reader.GetString(1)} | {reader.GetString(2)} | {reader.GetInt32(3)}");
                else Console.WriteLine("Employee Not Found");
        }
        public void SearchByDept()
        {
            Console.WriteLine("Enter Department Name");
            string dept = Console.ReadLine();
            using SqlConnection conn = new SqlConnection(connectionString);
            conn.Open();

            string query = "SELECT Id, Name, Department, Salary from EMPLOYEES Where Department =@Dept ";
            using SqlCommand cmd = new SqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@Dept", dept);
            using SqlDataReader reader = cmd.ExecuteReader();
            if (reader.Read()) Console.WriteLine($"{reader.GetInt32(0)} | {reader.GetString(1)} | {reader.GetString(2)} | {reader.GetInt32(3)}");
            else Console.WriteLine("Employee Not Found");
        }
    }
    }
