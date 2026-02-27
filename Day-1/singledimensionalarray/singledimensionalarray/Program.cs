using System;
class SingleArray
{
    static void Main(string[] args)
    {
        int[] arr = new int[5] { 51, 21, 89, 42, 11 };
        Array.Sort(arr);
        foreach (int i in arr)
            Console.Write(i + " ");
    }
}


