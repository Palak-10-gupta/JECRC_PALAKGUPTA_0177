using System;
class Solution
{
    static bool IsPalindrome(string s)
    {
        int left = 0, right = s.Length - 1;
        
        while (left < right)
        {
            if (s[left] != s[right])
                return false;
            left++;
            right--;
        }
        
        return true;
    }
    static void Main(string[] args)
    {
        string s = Console.ReadLine();
        Console.WriteLine(IsPalindrome(s) ? "True" : "False");
    }
}