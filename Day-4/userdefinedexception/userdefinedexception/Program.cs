using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomExceptionExampleCode
{
    // Custom Exception Class
    class MyException : Exception
    {
        // Constructor with message
        public MyException(string message) : base(message)
        {
        }

        // Default constructor
        public MyException()
        {
        }

        // Constructor with message and inner exception
        public MyException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}