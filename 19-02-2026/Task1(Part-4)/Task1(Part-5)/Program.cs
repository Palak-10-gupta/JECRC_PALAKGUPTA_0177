//You want the same program, but instead of using an abstract class,
//use a normal base class with virtual method and override it in derived classes.
using System;

class DrawingObject
{
    // Virtual method
    public virtual void Draw()
    {
        Console.WriteLine("Drawing an object.");
    }
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
        // Create array of base class reference
        DrawingObject[] objects = new DrawingObject[3];

        // Store derived class objects
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
