using System;
using System.Threading.Tasks;

class AsyncService
{
    public int requestCount { get; set; }
    public long lastResponseTime { get; set; }

    public virtual async Task<string> FetchDataAsync(string endpoint)
    {
        await Task.Delay(2000);
        return "";
    }

    public virtual async Task<string> GetStatusAsync()
    {
        await Task.Delay(1);
        return "";
    }
}

class WeatherService : AsyncService
{
    public string city { get; set; }
    public int temperature { get; set; }

    public override async Task<string> FetchDataAsync(string endpoint)
    {
        requestCount++;

        Console.WriteLine($"Weather Fetch Started,{city}");

        await Task.Delay(2000);

        temperature = 22;

        string result = $"Weather Data Received,{city},{temperature}°C";

        Console.WriteLine(result);

        return result;
    }

    public override async Task<string> GetStatusAsync()
    {
        await Task.Delay(1);

        string result = $"Weather Service Status,Requests:{requestCount}";

        Console.WriteLine(result);

        return result;
    }
}

class StockService : AsyncService
{
    public string symbol { get; set; }
    public double currentPrice { get; set; }

    public override async Task<string> FetchDataAsync(string endpoint)
    {
        requestCount++;

        Console.WriteLine($"Stock Fetch Started,{symbol}");

        await Task.Delay(2000);

        currentPrice = 150.75;

        string result = $"Stock Price Update,{symbol},${currentPrice}";

        Console.WriteLine(result);

        return result;
    }

    public override async Task<string> GetStatusAsync()
    {
        await Task.Delay(1);

        string result = $"Stock Service Status,Requests:{requestCount}";

        Console.WriteLine(result);

        return result;
    }
}

class Program
{
    static async Task Main()
    {
        string serviceType = Console.ReadLine();
        string identifier = Console.ReadLine();
        string command = Console.ReadLine();

        if (serviceType == "Weather")
        {
            WeatherService weather = new WeatherService
            {
                city = identifier
            };

            if (command == "FetchDataAsync")
            {
                await weather.FetchDataAsync(identifier);
            }
            else if (command == "GetStatusAsync")
            {
                await weather.GetStatusAsync();
            }
        }
        else if (serviceType == "Stock")
        {
            StockService stock = new StockService
            {
                symbol = identifier
            };

            if (command == "FetchDataAsync")
            {
                await stock.FetchDataAsync(identifier);
            }
            else if (command == "GetStatusAsync")
            {
                await stock.GetStatusAsync();
            }
        }
    }
}