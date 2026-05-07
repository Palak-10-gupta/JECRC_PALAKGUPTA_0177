using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, int[]> students = new Dictionary<string, int[]>();

        HashSet<int> uniqueGrades = new HashSet<int>();

        string topStudent = "";
        double topAverage = 0;

        List<string> eligibleStudents = new List<string>();

        for (int i = 0; i < n; i++)
        {
            string input = Console.ReadLine();

            string[] parts = input.Split(' ');

            string name = parts[0];

            int[] grades = new int[4];

            for (int j = 0; j < 4; j++)
            {
                grades[j] = int.Parse(parts[j + 1]);

                uniqueGrades.Add(grades[j]);
            }

            students[name] = grades;
        }

        Console.WriteLine("--- Student Grade Report ---");
        Console.WriteLine();

        foreach (var student in students)
        {
            string name = student.Key;
            int[] grades = student.Value;

            double average = grades.Average();

            int highest = grades.Max();

            int lowest = grades.Min();

            Console.WriteLine($"{name}: Average = {average:F2}, Highest = {highest}, Lowest = {lowest}");
            Console.WriteLine();

            if (average > topAverage)
            {
                topAverage = average;
                topStudent = name;
            }

            bool allAbove80 = true;

            foreach (int grade in grades)
            {
                if (grade < 80)
                {
                    allAbove80 = false;
                    break;
                }
            }

            if (allAbove80)
            {
                eligibleStudents.Add($"{name} ({string.Join(",", grades)})");
            }
        }

        Console.WriteLine($"Top Performer: {topStudent} (Average: {topAverage:F2})");
        Console.WriteLine();

        Console.WriteLine("Students with all grades >= 80:");
        Console.WriteLine();

        foreach (string student in eligibleStudents)
        {
            Console.WriteLine(student);
            Console.WriteLine();
        }

        Console.WriteLine("Unique Grade Values Across All Students:");
        Console.WriteLine();

        Console.WriteLine(string.Join(",", uniqueGrades.OrderBy(x => x)));
        Console.WriteLine();

        Console.WriteLine($"Total unique grades: {uniqueGrades.Count}");
    }
}