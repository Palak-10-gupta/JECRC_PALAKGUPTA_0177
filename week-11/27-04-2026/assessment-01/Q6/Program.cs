using System;
class Solution
{
    static int[] MergeSortedArrays(int[] arr1, int[] arr2)
    {
        int[] result = new int[arr1.Length + arr2.Length];
        int i = 0, j = 0, k = 0;
        while (i < arr1.Length && j < arr2.Length)
        {
            if (arr1[i] < arr2[j])
                result[k++] = arr1[i++];
            else
                result[k++] = arr2[j++];
        }
        while (i < arr1.Length)
            result[k++] = arr1[i++];
        while (j < arr2.Length)
            result[k++] = arr2[j++];
        return result;
    }
    static void Main(string[] args)
    {
        int[] arr1 = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);
        int[] arr2 = Array.ConvertAll(Console.ReadLine().Split(), int.Parse);
        int[] mergedArray = MergeSortedArrays(arr1, arr2);
        Console.WriteLine(string.Join(" ", mergedArray));
    }
}