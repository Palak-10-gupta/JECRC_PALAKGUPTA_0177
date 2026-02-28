using System;

class NestedFinallyExample
{
    static void Main(string[] args)
    {
        try
        {
            Console.WriteLine("Outer Try Block Started");

            int a = 10;
            int b = 0;

            // Nested try block
            try
            {
                Console.WriteLine("Inner Try Block Started");

                int result = a / b;   // This will cause DivideByZeroException
                Console.WriteLine("Result: " + result);
            }
            catch (DivideByZeroException ex)
            {
                Console.WriteLine("Inner Catch Block: " + ex.Message);
            }
            finally
            {
                Console.WriteLine("Inner Finally Block Executed");
            }

            Console.WriteLine("Outer Try Block Ended");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Outer Catch Block: " + ex.Message);
        }
        finally
        {
            Console.WriteLine("Outer Finally Block Executed");
        }

        Console.ReadLine();
    }
}