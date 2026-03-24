using System;
namespace AccessModifierDemo
{
    class UsingAccessModifier
    {
        public void PublicMethod()
        {
            Console.WriteLine("It's Public");
        }
        private void privateMethod()
        {
            Console.WriteLine("It's Private");
        }
        protected void protectedMethod()
        {
            Console.WriteLine("It's Protected");
        }
        internal void internalMethod()
        {
            Console.WriteLine("It's internal");
        }
        protected internal void protectedinternalMethod()
        {
            Console.WriteLine("It's protectedInternalMethod");
        }
        void SomeMethod()
        {
            Console.WriteLine("Some Method");
        }

    }
    class Test
    {
        static void Main(string[] args)
        {
            UsingAccessModifier obj = new UsingAccessModifier();
            obj.PublicMethod();
            obj.protectedinternalMethod();
            obj.internalMethod();
            //u will get error for private, protected and SomeMethod.
        }
    }
}
