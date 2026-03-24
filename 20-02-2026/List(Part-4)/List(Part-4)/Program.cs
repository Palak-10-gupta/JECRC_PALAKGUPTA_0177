using System;
using System.Collections.Generic;
using System.Linq;
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
        public bool DeleteProduct(int id)
        {
            var productid = products.FirstOrDefault(p => p.Id == id); //lambda expression
            if (productid == null)
                return false;
         
            return true;
     
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
            int id;
            do
            {
                Console.WriteLine("\n 1. Add Product");
                Console.WriteLine("\n 2. Display Product");
                Console.WriteLine("\n 3. Delete Product");
                Console.WriteLine("\n 0. Exit");
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
                        id = Convert.ToInt32(Console.ReadLine());
                        catalog.DeleteProduct(id);
                        break;
                    case 0:
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

