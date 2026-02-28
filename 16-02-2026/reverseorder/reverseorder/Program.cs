using System;

class ReverseLetters
{
    public static void Main()
    {
        Console.Write("Enter letter: ");
        char letter1 = Convert.ToChar(Console.ReadLine());

        Console.Write("Enter letter: ");
        char letter2 = Convert.ToChar(Console.ReadLine());

        Console.Write("Enter letter: ");
        char letter3 = Convert.ToChar(Console.ReadLine());

        Console.WriteLine("\nExpected Output :");
        Console.WriteLine(letter3 + " " + letter2 + " " + letter1);
    }
}
