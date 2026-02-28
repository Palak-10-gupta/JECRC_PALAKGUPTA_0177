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

class ODLExercise
{
    public static void Main()
    {
        GroupAgent a1 = new GroupAgent();
        a1.show();

        Agent b1 = new Agent();
        b1.show();

        GroupAgent a2 = new Agent();
        a2.show();
    }
}
