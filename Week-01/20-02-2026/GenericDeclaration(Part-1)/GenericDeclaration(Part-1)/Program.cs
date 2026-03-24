using GenericDemo;
using System;
namespace GenericDemo
{
    class usingGenerics<T> //type safe-<T> i.e. object can be of any datatype
    {
        T obj;  //custom defined type
        public usingGenerics(T obj1)
        {
            this.obj = obj1;
        }
        public T Get()
        {
            return obj;
        }
        public void ShowType()
        {
            Console.WriteLine("Type of T is" + typeof(T));
        }
    }
}
class TestGenerics
{
    public static void Main(string[] args)
    {
        usingGenerics<int> objdata;
        objdata = new usingGenerics<int>(500);
        objdata.ShowType();
        usingGenerics<string> objdatastr;
        objdatastr = new usingGenerics<string>("Palak");
        objdata.ShowType();
    }
}