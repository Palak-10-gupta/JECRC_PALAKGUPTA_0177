using System;

class Product
{
    int productId;
    string productName;
    double price;
    int quantity;
    double totalAmount;

    // Parameterized Constructor
    public Product(int id, string name, double pr, int qty)
    {
        productId = id;
        productName = name;
        price = pr;
        quantity = qty;
        totalAmount = price * quantity;
    }

    public void Display()
    {
        Console.WriteLine("\n--- Product Details ---");
        Console.WriteLine("Product ID: " + productId);
        Console.WriteLine("Product Name: " + productName);
        Console.WriteLine("Price: " + price);
        Console.WriteLine("Quantity: " + quantity);
        Console.WriteLine("Total Amount: " + totalAmount);
    }
}

class Demo
{
    static void Main()
    {
        Console.Write("Enter Product ID: ");
        int id = Convert.ToInt32(Console.ReadLine());

        Console.Write("Enter Product Name: ");
        string name = Console.ReadLine();

        Console.Write("Enter Price: ");
        double price = Convert.ToDouble(Console.ReadLine());

        Console.Write("Enter Quantity: ");
        int qty = Convert.ToInt32(Console.ReadLine());

        // Passing values through constructor
        Product p1 = new Product(id, name, price, qty);

        p1.Display();
    }
}

