using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        string input = Console.ReadLine();

        int k = int.Parse(Console.ReadLine());

        // Extract numbers
        string numbersPart = input.Split(':')[1];

        int[] numbers = numbersPart
            .Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(x => int.Parse(x.Trim()))
            .ToArray();

        Console.WriteLine("--- Access Pattern Analysis ---");
        Console.WriteLine();

        // Frequency Dictionary
        Dictionary<int, int> frequency = new Dictionary<int, int>();

        foreach (int num in numbers)
        {
            if (frequency.ContainsKey(num))
            {
                frequency[num]++;
            }
            else
            {
                frequency[num] = 1;
            }
        }

        // Longest Consecutive Sequence
        HashSet<int> set = new HashSet<int>(numbers);

        List<int> longestSequence = new List<int>();

        foreach (int num in set)
        {
            if (!set.Contains(num - 1))
            {
                List<int> current = new List<int>();
                int currentNum = num;

                while (set.Contains(currentNum))
                {
                    current.Add(currentNum);
                    currentNum++;
                }

                if (current.Count > longestSequence.Count)
                {
                    longestSequence = current;
                }
            }
        }

        Console.WriteLine($"Longest Consecutive Sequence: {string.Join(",", longestSequence)} (Length: {longestSequence.Count})");
        Console.WriteLine();

        // Most Frequent Element
        var mostFrequent = frequency
            .OrderByDescending(x => x.Value)
            .First();

        Console.WriteLine($"Most Frequent Element: {mostFrequent.Key} (appears {mostFrequent.Value} times)");
        Console.WriteLine();

        // First Non-Repeating Element
        int firstNonRepeating = -1;

        foreach (int num in numbers)
        {
            if (frequency[num] == 1)
            {
                firstNonRepeating = num;
                break;
            }
        }

        Console.WriteLine($"First Non-Repeating Element: {firstNonRepeating}");
        Console.WriteLine();

        // Pairs with Difference K
        List<string> pairs = new List<string>();

        foreach (int num in set)
        {
            if (set.Contains(num + k))
            {
                pairs.Add($"({num}, {num + k})");
            }
        }

        Console.WriteLine($"Pairs with Difference {k}:");
        Console.WriteLine();

        Console.WriteLine(string.Join(", ", pairs));
        Console.WriteLine();

        // Majority Element
        int total = numbers.Length;

        double percentage = ((double)mostFrequent.Value / total) * 100;

        if (mostFrequent.Value > total / 2)
        {
            Console.WriteLine($"Majority Element: {mostFrequent.Key}");
        }
        else
        {
            Console.WriteLine($"Majority Element: {mostFrequent.Key} (appears {mostFrequent.Value} out of {total} times - {percentage:F1}% - No majority)");
        }
    }
}