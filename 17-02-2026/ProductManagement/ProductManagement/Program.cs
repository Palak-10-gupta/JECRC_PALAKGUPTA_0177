using System;
namespace ProductManagement
{
    class Product
    {

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public DateTime ExpiryDate { get; set; }
        public int Quantity { get; set; }
        public string ISOStandard { get; set; }
        public double Price { get; set; }


        public void ReadProduct()
        {
            Console.Write("Enter Product ID: ");
            ProductId = int.Parse(Console.ReadLine());

            Console.Write("Enter Product Name: ");
            ProductName = Console.ReadLine();

            Console.Write("Enter Expiry Date (yyyy-mm-dd): ");
            ExpiryDate = DateTime.Parse(Console.ReadLine());

            Console.Write("Enter Quantity: ");
            Quantity = int.Parse(Console.ReadLine());

            Console.Write("Enter ISO Standard: ");
            ISOStandard = Console.ReadLine();

            Console.Write("Enter Price: ");
            Price = double.Parse(Console.ReadLine());
        }

        public void DisplayProduct()
        {
            Console.WriteLine("\n--- Product Details ---");
            Console.WriteLine("Product ID     : " + ProductId);
            Console.WriteLine("Product Name   : " + ProductName);
            Console.WriteLine("Expiry Date    : " + ExpiryDate.ToShortDateString());
            Console.WriteLine("Quantity       : " + Quantity);
            Console.WriteLine("ISO Standard   : " + ISOStandard);
            Console.WriteLine("Price          : " + Price);
        }
    }

    class Program
    {
        static void Main()
        {
            Product p = new Product();

            p.ReadProduct();
            p.DisplayProduct();
        }
    }
}

