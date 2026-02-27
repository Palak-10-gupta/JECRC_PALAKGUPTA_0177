//task-3
using System;

namespace AbstractClassDemo
{
    // Abstract class
    abstract class OrderProcessor
    {
        // Properties
        public int OrderId { get; set; }
        public double Amount { get; set; }

        // Abstract methods
        public abstract void ProcessPayment();
        public abstract void GenerateInvoice();
        public abstract void SendNotification();

        // Concrete method
        public void DisplayOrderDetails()
        {
            Console.WriteLine("Order Details:");
            Console.WriteLine(OrderId);
            Console.WriteLine(Amount);
        }
    }

    // Derived class
    class OnlineOrder : OrderProcessor
    {
        // Override abstract methods

        public override void ProcessPayment()
        {
            Console.WriteLine("Processing online payment...");
        }

        public override void GenerateInvoice()
        {
            Console.WriteLine("Generating digital invoice...");
        }

        public override void SendNotification()
        {
            Console.WriteLine("Sending email notification to customer...");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            OrderProcessor order = new OnlineOrder();

            // Assign order details
            order.OrderId = 101;
            order.Amount = 2500.75;

            // Call methods
            order.DisplayOrderDetails();
            order.ProcessPayment();
            order.GenerateInvoice();
            order.SendNotification();

            Console.ReadLine();
        }
    }
}
