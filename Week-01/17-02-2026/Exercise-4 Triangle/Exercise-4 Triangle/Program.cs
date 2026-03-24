using System;

class Program
{
    static void Main()
    {
        // Taking inputs
        Console.Write("Enter a number: ");
        string num = Console.ReadLine();

        Console.Write("Enter the desired width: ");
        int width = int.Parse(Console.ReadLine());

        Console.WriteLine("\nTriangle:\n");

        // Outer loop -> controls rows
        for (int i = 1; i <= width; i++)
        {
            // Inner loop -> prints number i times
            for (int j = 1; j <= i; j++)
            {
                Console.Write(num);
            }
            Console.WriteLine();
        }
    }
}


