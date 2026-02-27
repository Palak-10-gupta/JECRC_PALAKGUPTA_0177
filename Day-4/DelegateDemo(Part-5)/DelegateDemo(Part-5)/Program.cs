namespace DelegateDemo
{
    //delegate is made outside class
    class UsingDelegates
    {
        public delegate void ArithmeticOperation(int x, int y);

        //static void AddSimple()
        //{
        //    Console.WriteLine("");
        //}
        
        //upper commented method will not work because delegate is defined with parameters and it has no same parameters.


        static void Add(int x, int y)
        {
            Console.WriteLine(x + y);
        }
        static void Sub(int x, int y)
        {
            Console.WriteLine(x - y);
        }
        static void Mul(int x, int y)
        {
            Console.WriteLine(x * y);
        }
        static void Div(int x, int y)
        {
            Console.WriteLine(x / y);
        }
        static void Main(string[] args)
        {
            //ArithmeticOperation obj = new ArithmeticOperation(Add); //Add method is assigned to delegate object
            //obj(45, 30);
            //ArithmeticOperation obj = new ArithmeticOperation(Sub);
            //obj(45, 30);
            ArithmeticOperation obj = new ArithmeticOperation(Add);
            obj += new ArithmeticOperation(Sub);
            obj -= new ArithmeticOperation(Mul);  // benefit of using multicast delegates,
                                                  // if you put minus it will not run it will skip it.
            obj += new ArithmeticOperation(Div);
            obj += new ArithmeticOperation(Mul);
            obj(45, 30);
            Console.ReadLine();
        }
    }
}
