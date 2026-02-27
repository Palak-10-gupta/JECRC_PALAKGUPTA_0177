//using requirement
using System;

abstract class DrawingObject
{
    // Abstract method
    public abstract void Draw();
}

// Derived class Line
class Line : DrawingObject
{
    public override void Draw()
    {
        Console.WriteLine("I'm a Line.");
    }
}

// Derived class Circle
class Circle : DrawingObject
{
    public override void Draw()
    {
        Console.WriteLine("I'm a Circle.");
    }
}

// Derived class Square
class Square : DrawingObject
{
    public override void Draw()
    {
        Console.WriteLine("I'm a Square.");
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Create array of DrawingObject
        DrawingObject[] objects = new DrawingObject[3];

        // Store objects
        objects[0] = new Line();
        objects[1] = new Circle();
        objects[2] = new Square();

        // Loop and call Draw()
        foreach (DrawingObject obj in objects)
        {
            obj.Draw();
        }

        Console.ReadLine();
    }
}

