
using System;
class ODLExample1
{

    public static void Main()
{
    string[] stringArray = new string[5] { "Csharp", "ASP.net", "EntityFramework", "ADO.net", "WCF" };
    Array.Sort(stringArray);
    // write array
    foreach (string str in stringArray)
    {
        Console.Write(str + " ");

    }
}  
}
