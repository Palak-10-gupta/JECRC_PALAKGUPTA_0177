using System;

public class TaxPayer
{
    public int TaxPayerId { get; set; }
    public string Name { get; set; }
    public double Income { get; set; }
    public double Surcharge { get; set; }
}

public class DefaultSolution
{
    public static void Main()
    {
        TaxPayer taxPayer = new TaxPayer
        {
            TaxPayerId = 801,
            Name = "Ravi",
            Income = 800000,
            Surcharge = 20000
        };

        // Tax Rules
        Func<TaxPayer, double> individualTaxRule = tp => tp.Income * 0.10;
        Func<TaxPayer, double> businessTaxRule = tp => (tp.Income * 0.15) + tp.Surcharge;
        Func<TaxPayer, double> seniorCitizenTaxRule = tp => tp.Income * 0.05;

        // Individual
        PrintTax(taxPayer, "Individual", individualTaxRule);

        // Business
        PrintTax(taxPayer, "Business", businessTaxRule);

        // Senior Citizen
        PrintTax(taxPayer, "Senior Citizen", seniorCitizenTaxRule);
    }

    public static void PrintTax(TaxPayer taxPayer, string category, Func<TaxPayer, double> calculator)
    {
        double tax = calculator(taxPayer);

        Console.WriteLine("========= TAX COMPUTATION =========");
        Console.WriteLine("Name : " + taxPayer.Name);
        Console.WriteLine("Category : " + category);
        Console.WriteLine("Tax : " + tax);
        Console.WriteLine("----------------------------------");
    }
}