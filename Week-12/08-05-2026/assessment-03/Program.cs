using System;
using System.Collections.Generic;

class BankAccount
{
    public string accountNumber { get; }
    protected double balance { get; private set; }

    public BankAccount(string accountNumber, double initialDeposit)
    {
        this.accountNumber = accountNumber;
        balance = initialDeposit;
    }

    public virtual bool Withdraw(double amount)
    {
        if (amount <= balance)
        {
            balance -= amount;
            return true;
        }
        return false;
    }

    public double GetBalance()
    {
        return balance;
    }

    protected void SetBalance(double amount)
    {
        balance = amount;
    }
}

class SavingsAccount : BankAccount
{
    public double minimumBalance = 1000;

    public SavingsAccount(string accountNumber, double initialDeposit)
        : base(accountNumber, initialDeposit)
    {
    }

    public override bool Withdraw(double amount)
    {
        if (GetBalance() - amount < minimumBalance)
        {
            return false;
        }

        SetBalance(GetBalance() - amount);
        return true;
    }

    public void ApplyInterest(double rate)
    {
        double newBalance = GetBalance() + (GetBalance() * rate / 100);
        SetBalance(newBalance);
    }
}

class CurrentAccount : BankAccount
{
    public double overdraftLimit = 2000;
    public double transactionFee = 50;

    public CurrentAccount(string accountNumber, double initialDeposit)
        : base(accountNumber, initialDeposit)
    {
    }

    public override bool Withdraw(double amount)
    {
        if (GetBalance() + overdraftLimit >= amount)
        {
            SetBalance(GetBalance() - amount);
            return true;
        }
        return false;
    }

    public void DeductTransactionFee()
    {
        SetBalance(GetBalance() - transactionFee);
    }
}

class Program
{
    static void Main()
    {
        string accountType = Console.ReadLine();
        string accountNumber = Console.ReadLine();
        double initialDeposit = double.Parse(Console.ReadLine());

        List<string> operations = new List<string>();

        for (int i = 0; i < 3; i++)
        {
            operations.Add(Console.ReadLine());
        }

        List<string> output = new List<string>();

        if (accountType == "Savings")
        {
            SavingsAccount account = new SavingsAccount(accountNumber, initialDeposit);

            foreach (string operation in operations)
            {
                string[] parts = operation.Split(' ');

                if (parts[0] == "Withdraw")
                {
                    if (!account.Withdraw(double.Parse(parts[1])))
                    {
                        output.Add("Withdrawal Failed: Minimum balance requirement 1000");
                    }
                }
                else if (parts[0] == "GetBalance")
                {
                    output.Add($"Current Balance: {account.GetBalance():0}");
                }
                else if (parts[0] == "ApplyInterest")
                {
                    double rate = double.Parse(parts[1]);
                    account.ApplyInterest(rate);
                    output.Add($"Interest Applied,Rate:{rate},New Balance:{account.GetBalance():0}");
                }
            }
        }

        foreach (string line in output)
        {
            Console.WriteLine(line);
        }
    }
}