using System;

class ODLExercise
{
    private static int number;
    public static int Number
    {
        get { return number; }
    }

    static ODLExercise()
    {
        Random r = new Random();
        number = r.Next();
    }
}

class Program
{
    static void Main(string[] args)
    {
       
        Console.WriteLine("Static Number = " + ODLExercise.Number);
    }
}

