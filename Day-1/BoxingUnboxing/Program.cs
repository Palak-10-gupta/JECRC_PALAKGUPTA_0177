// See https://aka.ms/new-console-template for more information
using System;
class Program
{
    static void Main(string[] args)
    {
       // Console.WriteLine("Hello, World!");
        int marks = 85;
        Console.WriteLine("Marks: " + marks);
        object objmarks=marks;  //boxing
        Console.WriteLine("Object Marks: " + objmarks);
        int unboxmarks = (int) objmarks; //unboxing
        Console.WriteLine("Unboxed Marks: " + unboxmarks);
        unboxmarks = unboxmarks + 5; //modifying unboxed value
        Console.WriteLine("Modified Unboxed Marks: " + unboxmarks);
    }
}
