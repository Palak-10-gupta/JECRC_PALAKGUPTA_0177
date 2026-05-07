using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        string input = Console.ReadLine();

        int target = int.Parse(Console.ReadLine());

        int[] prices = input.Split(':')[1]
            .Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(x => int.Parse(x.Trim()))
            .ToArray();

        int[] originalPrices = new int[prices.Length];
        Array.Copy(prices, originalPrices, prices.Length);

        // Bubble Sort
        for (int i = 0; i < prices.Length - 1; i++)
        {
            for (int j = 0; j < prices.Length - i - 1; j++)
            {
                if (prices[j] > prices[j + 1])
                {
                    int temp = prices[j];
                    prices[j] = prices[j + 1];
                    prices[j + 1] = temp;
                }
            }
        }

        Console.WriteLine("--- Product Price Analysis ---");
        Console.WriteLine();

        Console.WriteLine("Original Prices: " + string.Join(", ", originalPrices));
        Console.WriteLine();

        Console.WriteLine("Sorted Prices (Ascending): " + string.Join(", ", prices));
        Console.WriteLine();

        // Binary Search
        Console.WriteLine("Binary Search Results:");
        Console.WriteLine();

        int index399 = BinarySearch(prices, 399);

        if (index399 != -1)
        {
            Console.WriteLine($"Price 399 found at index {index399}");
        }
        else
        {
            Console.WriteLine("Price 399 not found");
        }

        Console.WriteLine();

        int index500 = BinarySearch(prices, 500);

        if (index500 != -1)
        {
            Console.WriteLine($"Price 500 found at index {index500}");
        }
        else
        {
            Console.WriteLine("Price 500 not found");
        }

        Console.WriteLine();

        // Pairs with Target Sum
        Console.WriteLine($"Pairs that sum to {target}:");
        Console.WriteLine();

        for (int i = 0; i < prices.Length; i++)
        {
            for (int j = i + 1; j < prices.Length; j++)
            {
                if (prices[i] + prices[j] == target)
                {
                    Console.WriteLine($"({prices[i]}, {prices[j]})");
                    Console.WriteLine();
                }
            }
        }

        // Longest Increasing Subsequence
        List<int> lis = new List<int>();

        lis.Add(prices[0]);

        for (int i = 1; i < prices.Length; i++)
        {
            if (prices[i] > lis[lis.Count - 1])
            {
                lis.Add(prices[i]);
            }
        }

        Console.WriteLine("Longest Increasing Subsequence:");
        Console.WriteLine();

        Console.WriteLine($"{string.Join(", ", lis)} (Length: {lis.Count})");
        Console.WriteLine();

        // Statistics
        int lowest = prices.Min();
        int highest = prices.Max();

        double average = prices.Average();

        double median;

        int mid = prices.Length / 2;

        median = (prices[mid - 1] + prices[mid]) / 2.0;

        Console.WriteLine("Statistics:");
        Console.WriteLine();

        Console.WriteLine($"Lowest Price: {lowest}");
        Console.WriteLine();

        Console.WriteLine($"Highest Price: {highest}");
        Console.WriteLine();

        Console.WriteLine($"Average Price: {average:F2}");
        Console.WriteLine();

        Console.WriteLine($"Median Price: {median:F2}");
    }

    static int BinarySearch(int[] arr, int target)
    {
        int left = 0;
        int right = arr.Length - 1;

        while (left <= right)
        {
            int mid = (left + right) / 2;

            if (arr[mid] == target)
            {
                return mid;
            }
            else if (arr[mid] < target)
            {
                left = mid + 1;
            }
            else
            {
                right = mid - 1;
            }
        }

        return -1;
    }
}