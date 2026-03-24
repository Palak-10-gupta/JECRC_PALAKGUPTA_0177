//It will not run

using System;

class GroupAgent
{
    public virtual void show()
    {
        Console.WriteLine("GroupAgent Created !!!!");
        Console.ReadLine();
    }
}

class Agent : GroupAgent
{
    public sealed override void show()
    {
        Console.WriteLine("Agent Created !!!!");
        Console.ReadLine();
    }
}

class Booking : Agent
{
    public override void show()
    {
        Console.WriteLine("Booking Created !!!!");
        Console.ReadLine();
    }
}
