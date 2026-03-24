namespace AbstractDemo
{
    public abstract class CalcArea
{
       public abstract void Area(double radius);

        public abstract void bFunction();  //abstract ni hota toh u don't need to override.As u change to abstract method u need to override
       // {
       //    Console.WriteLine("I am Non abstract Method");
       // }
}
interface IVolume
{
    void CalcVolume(int side);
}
public class CircleCube : CalcArea, IVolume
{
    public override void Area(double radius)   //in abstract class u should override every method
    {
        double pie = 3.14;
        double result;
        result = pie * radius * radius;
        Console.WriteLine(result);
    }
    public override void bFunction()
        {
            Console.WriteLine("I am implemented abstract bFunction()");
        }

     public void CalcVolume(int side)
    {
        int result;
        result = side * side * side;
        Console.WriteLine(result);
    }
}
class TestApp
{
    public static void Main(string[] args)
    {
        CircleCube obj = new CircleCube();
        double radius;
        int side;
        Console.WriteLine("Enter the value for Radius");
        radius = Convert.ToDouble(Console.ReadLine());
        obj.Area(radius);
        obj.bFunction();
        Console.WriteLine("Enter the value for side");
        side = Convert.ToInt32((Console.ReadLine()));
        obj.CalcVolume(side);
        Console.ReadLine();
    }
}
}

