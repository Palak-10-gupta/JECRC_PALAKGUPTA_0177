using System;

class ODLExercise
{
    public void Addition()
    {
        Console.Write("Enter first number: ");
        int a = Convert.ToInt32(Console.ReadLine());

        Console.Write("Enter second number: ");
        int b = Convert.ToInt32(Console.ReadLine());

        int sum = a + b;
        Console.WriteLine("Sum = " + sum);
    }

    public void Subtraction()
    {
        Console.Write("Enter first number: ");
        int a = Convert.ToInt32(Console.ReadLine());

        Console.Write("Enter second number: ");
        int b = Convert.ToInt32(Console.ReadLine());

        int sub = a - b;
        Console.WriteLine("Subtraction = " + sub);
    }

    public void Multiplication()
    {
        Console.Write("Enter first number: ");
        int a = Convert.ToInt32(Console.ReadLine());

        Console.Write("Enter second number: ");
        int b = Convert.ToInt32(Console.ReadLine());

        int mul = a * b;
        Console.WriteLine("Multiplication = " + mul);
    }

    public void Division()
    {
        Console.Write("Enter first number: ");
        int a = Convert.ToInt32(Console.ReadLine());

        Console.Write("Enter second number: ");
        int b = Convert.ToInt32(Console.ReadLine());

        if (b != 0)
        {
            int div = a / b;
            Console.WriteLine("Division = " + div);
        }
        else
        {
            Console.WriteLine("Division not possible (divide by zero)");
        }
    }
}

class Demo
{
    static void Main()
    {
        ODLExercise obj1 = new ODLExercise();

        obj1.Addition();
        obj1.Subtraction();
        obj1.Multiplication();
        obj1.Division();
    }
}
