using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        string electronicsInput = Console.ReadLine();
        string clothingInput = Console.ReadLine();
        string booksInput = Console.ReadLine();

        HashSet<string> electronics = new HashSet<string>(
            electronicsInput.Split(':')[1]
            .Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(x => x.Trim())
        );

        HashSet<string> clothing = new HashSet<string>(
            clothingInput.Split(':')[1]
            .Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(x => x.Trim())
        );

        HashSet<string> books = new HashSet<string>(
            booksInput.Split(':')[1]
            .Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(x => x.Trim())
        );

        // 1. Union
        HashSet<string> anyCategory = new HashSet<string>(electronics);
        anyCategory.UnionWith(clothing);
        anyCategory.UnionWith(books);

        // 2. Intersection
        HashSet<string> allCategories = new HashSet<string>(electronics);
        allCategories.IntersectWith(clothing);
        allCategories.IntersectWith(books);

        // 3. Only Electronics
        HashSet<string> onlyElectronics = new HashSet<string>(electronics);
        onlyElectronics.ExceptWith(clothing);

        // 4. Electronics AND Books but NOT Clothing
        HashSet<string> electronicsAndBooks = new HashSet<string>(electronics);
        electronicsAndBooks.IntersectWith(books);
        electronicsAndBooks.ExceptWith(clothing);

        Console.WriteLine("--- Customer Preference Analysis ---");
        Console.WriteLine();

        Console.WriteLine("1. Customers in ANY category (Union):");
        Console.WriteLine();

        Console.WriteLine(string.Join(", ", anyCategory.OrderBy(x => x)));
        Console.WriteLine();
        Console.WriteLine($"Total: {anyCategory.Count} customers");
        Console.WriteLine();

        Console.WriteLine("2. Customers in ALL categories (Intersection):");
        Console.WriteLine();

        Console.WriteLine(string.Join(", ", allCategories.OrderBy(x => x)));
        Console.WriteLine();
        Console.WriteLine($"Total: {allCategories.Count} customer");
        Console.WriteLine();

        Console.WriteLine("3. Customers ONLY in Electronics (Difference):");
        Console.WriteLine();

        Console.WriteLine(string.Join(", ", onlyElectronics.OrderBy(x => x)));
        Console.WriteLine();
        Console.WriteLine($"Total: {onlyElectronics.Count} customers");
        Console.WriteLine();

        Console.WriteLine("4. Customers in Electronics AND Books but NOT Clothing:");
        Console.WriteLine();

        Console.WriteLine(string.Join(", ", electronicsAndBooks.OrderBy(x => x)));
        Console.WriteLine();
        Console.WriteLine($"Total: {electronicsAndBooks.Count} customers");
    }
}