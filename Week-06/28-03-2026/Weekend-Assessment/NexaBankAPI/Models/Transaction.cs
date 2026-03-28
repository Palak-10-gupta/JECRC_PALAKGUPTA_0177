namespace NexaBankAPI.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        // Date in YYYY-MM-DD format e.g. "2019-12-03"
        public string Date { get; set; } = string.Empty;

        // Full description text of the transaction
        public string Description { get; set; } = string.Empty;

        // 0 = Credit, 1 = Debit (matches demo exactly)
        public int Type { get; set; }

        // Transaction amount as float e.g. 1985.40
        public double Amount { get; set; }

        // Balance with $ prefix e.g. "$12,234.45"
        public string Balance { get; set; } = string.Empty;
    }
}