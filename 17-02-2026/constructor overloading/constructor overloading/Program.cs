using System;

class Calculator
{
    // Method 1: Addition of two integers
    public int Add(int a, int b)
    {
        return a + b;
    }

    // Method 2: Addition of three integers
    public int Add(int a, int b, int c)
    {
        return a + b + c;
    }

    // Method 3: Addition of two double values
    public double Add(double a, double b)
    {
        return a + b;
    }

    static void Main(string[] args)
    {
        Calculator obj = new Calculator();

        Console.WriteLine("Addition of 2 integers: " + obj.Add(10, 20));
        Console.WriteLine("Addition of 3 integers: " + obj.Add(10, 20, 30));
        Console.WriteLine("Addition of 2 doubles: " + obj.Add(10.5, 20.5));

        Console.ReadLine();
    }
}
