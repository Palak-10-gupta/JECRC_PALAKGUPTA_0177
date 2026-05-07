using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<string, Dictionary<string, int>> salesData =
            new Dictionary<string, Dictionary<string, int>>();

        List<(string Product, string Region, int Amount)> records =
            new List<(string, string, int)>();

        for (int i = 0; i < n; i++)
        {
            string input = Console.ReadLine();

            string[] parts = input.Split(' ');

            string product = parts[0];
            string region = parts[1];
            int amount = int.Parse(parts[2]);

            records.Add((product, region, amount));

            if (!salesData.ContainsKey(product))
            {
                salesData[product] = new Dictionary<string, int>();
            }

            salesData[product][region] = amount;
        }

        int threshold = int.Parse(Console.ReadLine());

        Console.WriteLine("--- Sales Report by Product and Region ---");
        Console.WriteLine();

        Dictionary<string, double> productAverages =
            new Dictionary<string, double>();

        foreach (var product in salesData)
        {
            Console.WriteLine($"Product {product.Key}:");
            Console.WriteLine();

            int total = 0;
            int count = 0;

            foreach (var region in product.Value)
            {
                Console.WriteLine($"  {region.Key}: ${region.Value}");
                Console.WriteLine();

                total += region.Value;
                count++;
            }

            double average = (double)total / count;

            productAverages[product.Key] = average;

            Console.WriteLine($"  Total: ${total}, Average: ${average:F2}");
            Console.WriteLine();
        }

        Console.WriteLine("Best Selling Product by Region:");
        Console.WriteLine();

        Dictionary<string, (string Product, int Amount)> bestSales =
            new Dictionary<string, (string, int)>();

        foreach (var record in records)
        {
            if (!bestSales.ContainsKey(record.Region))
            {
                bestSales[record.Region] = (record.Product, record.Amount);
            }
            else if (record.Amount > bestSales[record.Region].Amount)
            {
                bestSales[record.Region] = (record.Product, record.Amount);
            }
        }

        foreach (var item in bestSales)
        {
            Console.WriteLine($"{item.Key}: {item.Value.Product} (${item.Value.Amount})");
            Console.WriteLine();
        }

        Console.WriteLine($"Underperforming Products (< ${threshold} average):");
        Console.WriteLine();

        foreach (var item in productAverages)
        {
            if (item.Value < threshold)
            {
                Console.WriteLine($"{item.Key} (${item.Value:F2})");
            }
        }
    }
}