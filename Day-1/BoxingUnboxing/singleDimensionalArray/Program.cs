// See https://aka.ms/new-console-template for more information
using System;
class ODLExample1
{
    public static void Main()
    {
        int[] intArray = new int[5] { 34, 23, 41, 89, 77};
        Array.Sort(intArray);
        foreach(int i in intArray)
        {
            Console.Write(i + " ");
        }
    }
}
