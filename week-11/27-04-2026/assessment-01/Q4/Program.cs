using System;
using System.Collections.Generic;
class Solution
{
    static int[] TwoSum(int[] nums, int target)
    {
        Dictionary<int, int> map = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++)
        {
            int complement = target - nums[i];
            if (map.ContainsKey(complement))
                return new int[] { map[complement], i };
            map[nums[i]] = i;
        }
        return new int[] { -1, -1 };  // This shouldn't happen if a solution exists
    }
    static void Main(string[] args)
    {
        int target = int.Parse(Console.ReadLine());
        int[] nums = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);
        
        int[] result = TwoSum(nums, target);
        Console.WriteLine($"[{result[0]}, {result[1]}]");
    }
}
