using System;
using System.Collections.Generic;
namespace ProductDemo
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public bool IsStock { get; set; }
    }
    public class ProductCatalog
    {
        private List<Product> products;
        public ProductCatalog()
        {
            //products = new List<Product>
            //{
            //    new Product{Id=100,Name="Laptop",Description="Electronics",Price=75000,IsStock=true},
            //    new Product{Id=102,Name="SmartPhone",Description="Electronics",Price=55000,IsStock=true},
            //    new Product{Id=103,Name="Desk",Description="Furniture",Price=5000,IsStock=true},
            //    new Product{Id=104,Name="Notebook",Description="Stationary",Price=750,IsStock=true}
            //};
            products = new List<Product>();
        }

        public void AddProduct()
        {
            Product product = new Product();
            Console.WriteLine("Enter the Product ID:");
            product.Id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter the Product Name:");
            product.Name = Console.ReadLine();
            Console.WriteLine("Enter the Product Description:");
            product.Description = Console.ReadLine();
            Console.WriteLine("Enter the Product Price:");
            product.Price = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine("Enter the Product IsStock:");
            product.IsStock = Convert.ToBoolean(Console.ReadLine());
            products.Add(product);
        }
        public void DisplayProducts()
        {
            foreach (var product in products)
            {
                Console.WriteLine(product.Name);
                Console.WriteLine(product.Description);
                Console.WriteLine(product.Price);
                Console.WriteLine(product.IsStock);
            }
        }
    }
    class TestProduct
    {
        static void Main(string[] args)
        {
            ProductCatalog catalog = new ProductCatalog();
            int choice;
            do
            {
                Console.WriteLine("\n 1. Add Product");
                Console.WriteLine("\n 2. Display Product");
                Console.WriteLine("\n 3. Exit");
                Console.WriteLine("\n Enter your choice: ");
                choice = Convert.ToInt32(Console.ReadLine());
                switch (choice)
                {
                    case 1:
                        catalog.AddProduct();
                        break;
                    case 2:
                        catalog.DisplayProducts();
                        break;
                    case 3:
                        Console.WriteLine("Exiting.......");
                        break;
                    default:
                        Console.WriteLine("Invalid choice");
                        break;
                }
            } while (choice != 3);
            //catalog.AddProduct();
            //catalog.DisplayProducts();
        }
    }
}
