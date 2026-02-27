using System;

class Program
{
    static void Main()
    {
        Console.Write("Input First number: ");
        int num1 = int.Parse(Console.ReadLine());

        Console.Write("Input Second number: ");
        int num2 = int.Parse(Console.ReadLine());

        bool result = (num1 % 2 == 0 && num2 % 2 == 0)   
                   || (num1 % 2 != 0 && num2 % 2 != 0); 

        Console.WriteLine("\nResult: " + result);
    }
}

