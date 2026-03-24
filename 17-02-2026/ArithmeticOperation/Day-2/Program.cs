using System;
class ODLExercise
{
    public void Addition()
    {
        int a = 10;
        int b = 20;
        int sum = a + b;
        Console.WriteLine("Sum = " + sum);
    }

    public void Subtraction()
    {
        int a = 10;
        int b = 20;
        int sub = a - b;
        Console.WriteLine("Subtraction = " + sub);
    }

    public void Multiplication()
    {
        int a = 10;
        int b = 20;
        int mul = a * b;
        Console.WriteLine("Multiplication = " + mul);
    }

    public void Division()
    {
        int a = 10;
        int b = 20;

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

