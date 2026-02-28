using System;

public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
    public int Marks { get; set; }
    public int Age { get; set; }
    public int Attendance { get; set; }
}

public class EligibilityEngine
{
    public void CheckEligibility(Student student, string program, Predicate<Student> rule)
    {
        bool isEligible = rule(student);

        Console.WriteLine("========= ELIGIBILITY CHECK =========");
        Console.WriteLine("Student Name : " + student.Name);
        Console.WriteLine("Program      : " + program);
        Console.WriteLine("Eligible     : " + isEligible);
        Console.WriteLine("-----------------------------------");
        Console.WriteLine();
    }
}

public class Program
{
    public static void Main()
    {
        // Step 1: Create student object
        Student student = new Student
        {
            StudentId = 301,
            Name = "Ananya",
            Marks = 78,
            Age = 18,
            Attendance = 85
        };

        // Step 2: Define eligibility predicates

        Predicate<Student> engineeringEligibility =
            s => s.Marks >= 60;

        Predicate<Student> medicalEligibility =
            s => s.Marks >= 70 && s.Age >= 17;

        Predicate<Student> managementEligibility =
            s => s.Marks >= 55 && s.Attendance >= 75;

        // Step 3: Create Eligibility Engine
        EligibilityEngine engine = new EligibilityEngine();

        // Step 4: Validate eligibility
        engine.CheckEligibility(student, "Engineering", engineeringEligibility);
        engine.CheckEligibility(student, "Medical", medicalEligibility);
        engine.CheckEligibility(student, "Management", managementEligibility);
    }
}