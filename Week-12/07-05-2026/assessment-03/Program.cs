using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

class Program
{
    static void Main()
    {
        string paragraph = Console.ReadLine();

        int n = int.Parse(Console.ReadLine());

        // Convert to lowercase
        paragraph = paragraph.ToLower();

        // Remove punctuation
        paragraph = Regex.Replace(paragraph, @"[^\w\s]", "");

        // Split into words
        string[] words = paragraph.Split(' ', StringSplitOptions.RemoveEmptyEntries);

        // Count frequencies
        Dictionary<string, int> frequency = new Dictionary<string, int>();

        foreach (string word in words)
        {
            if (frequency.ContainsKey(word))
            {
                frequency[word]++;
            }
            else
            {
                frequency[word] = 1;
            }
        }

        int totalWords = words.Length;
        int uniqueWords = frequency.Count;

        // Top N frequent words
        var topWords = frequency
            .OrderByDescending(x => x.Value)
            .ThenBy(x => x.Key)
            .Take(n);

        // Words appearing once
        var onceWords = frequency
            .Where(x => x.Value == 1)
            .Select(x => x.Key)
            .OrderBy(x => x);

        // Average frequency
        double average = (double)totalWords / uniqueWords;

        Console.WriteLine("--- Word Frequency Analysis ---");
        Console.WriteLine();

        Console.WriteLine($"Total words: {totalWords}");
        Console.WriteLine();

        Console.WriteLine($"Unique words: {uniqueWords}");
        Console.WriteLine();

        Console.WriteLine($"Top {n} Frequent Words:");
        Console.WriteLine();

        foreach (var item in topWords)
        {
            Console.WriteLine($"{item.Key}: {item.Value} times");
            Console.WriteLine();
        }

        Console.WriteLine("Words appearing exactly once:");
        Console.WriteLine();

        Console.WriteLine(string.Join(", ", onceWords));
        Console.WriteLine();

        Console.WriteLine($"Average frequency: {average:F2} times per unique word");
    }
}