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
            products = new List<Product>
            {
                new Product{Id=100,Name="Laptop",Description="Electronics",Price=75000,IsStock=true},
                new Product{Id=102,Name="SmartPhone",Description="Electronics",Price=55000,IsStock=true},
                new Product{Id=103,Name="Desk",Description="Furniture",Price=5000,IsStock=true},
                new Product{Id=104,Name="Notebook",Description="Stationary",Price=750,IsStock=true}
            };
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
            catalog.DisplayProducts();
        }
    }
}
