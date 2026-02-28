using System.Security.Principal;

namespace InterfaceDemo
{
    interface IArea
    {
        void CalcArea(double radius);
    }
    interface IVolume
    {
        void CalcVolume(int radius);
    }
    public class CircleCube: IArea,IVolume
    {
        public void CalcArea(double radius)
        {
            double pie = 3.14;
            double result;
            result = pie*radius*radius;
            Console.WriteLine(result);
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
            obj.CalcArea(radius);
            Console.WriteLine("Enter the value for side");
            side = Convert.ToInt32((Console.ReadLine()));
            obj.CalcVolume(side);
            Console.ReadLine();
        }
    }
}
