using System;
class Solution
{
    static int FindMissingNumber(int[] arr)
    {
        int n = arr.Length + 1;
        int totalSum = n * (n + 1) / 2;
        int arrSum = 0;
        
        foreach (int num in arr)
            arrSum += num;
        return totalSum - arrSum;
    }
    static void Main(string[] args)
    {
        int[] arr = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);
        Console.WriteLine(FindMissingNumber(arr));
    }
}