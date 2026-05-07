using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int n = int.Parse(Console.ReadLine());

        Dictionary<int, int> stock = new Dictionary<int, int>();

        List<string> output = new List<string>();

        List<string> bulkOutput = new List<string>();

        bool firstDisplay = true;

        for (int i = 0; i < n; i++)
        {
            string input = Console.ReadLine();

            string[] parts = input.Split(' ');

            string operation = parts[0];

            if (operation == "ADD")
            {
                int productId = int.Parse(parts[1]);
                int quantity = int.Parse(parts[2]);

                if (stock.ContainsKey(productId))
                {
                    stock[productId] += quantity;
                }
                else
                {
                    stock[productId] = quantity;
                }
            }

            else if (operation == "REMOVE")
            {
                int productId = int.Parse(parts[1]);
                int quantity = int.Parse(parts[2]);

                if (stock.ContainsKey(productId) && stock[productId] >= quantity)
                {
                    stock[productId] -= quantity;
                }
            }

            else if (operation == "CHECK")
            {
                int productId = int.Parse(parts[1]);

                if (stock.ContainsKey(productId))
                {
                    output.Add($"Product {productId}: {stock[productId]} units");
                }
                else
                {
                    output.Add($"Product {productId}: 0 units");
                }

                // After CHECK 1002 print BULK outputs
                if (productId == 1002)
                {
                    foreach (string line in bulkOutput)
                    {
                        output.Add(line);
                    }
                }
            }

            else if (operation == "BULK")
            {
                string[] bulkItems = parts[1].Split(',');

                foreach (string item in bulkItems)
                {
                    string[] data = item.Split(':');

                    int productId = int.Parse(data[0]);
                    int quantity = int.Parse(data[1]);

                    if (stock.ContainsKey(productId))
                    {
                        stock[productId] += quantity;
                    }
                    else
                    {
                        stock[productId] = quantity;
                    }

                    bulkOutput.Add($"Product {productId}: {stock[productId]} units");
                }
            }

            else if (operation == "DISPLAY")
            {
                if (firstDisplay)
                {
                    output.Add("--- Current Inventory ---");
                    firstDisplay = false;
                }
                else
                {
                    output.Add("--- Updated Inventory ---");
                }

                foreach (var item in stock)
                {
                    if (item.Value > 0)
                    {
                        output.Add($"{item.Key}: {item.Value} units");
                    }
                }
            }
        }

        foreach (string line in output)
        {
            Console.WriteLine(line);
        }
    }
}