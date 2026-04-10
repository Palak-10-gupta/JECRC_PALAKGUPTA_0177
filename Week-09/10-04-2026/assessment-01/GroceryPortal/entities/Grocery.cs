namespace GroceryPortal.entities
{
    public class Grocery
    {
        private int id;
        private string name;
        private double price;
        private int quantity;
        private string category;

        public int Id
        {
            get { return id; }
            set { id = value; }
        }

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public double Price
        {
            get { return price; }
            set { price = value; }
        }

        public int Quantity
        {
            get { return quantity; }
            set { quantity = value; }
        }

        public string Category
        {
            get { return category; }
            set { category = value; }
        }
       
    }
}