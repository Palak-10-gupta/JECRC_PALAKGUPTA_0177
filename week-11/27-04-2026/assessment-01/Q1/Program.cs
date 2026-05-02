using System;
class Solution
{
    static int SumOfDigits(int n)
    {
        int sum = 0;
        while (n > 0)
        {
            sum += n % 10;  // Add the last digit
            n /= 10;         // Remove the last digit
        }
        return sum;
    }
    static void Main(string[] args)
    {
        int n = int.Parse(Console.ReadLine());
        Console.WriteLine(SumOfDigits(n));
    }
}