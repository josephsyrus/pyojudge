export const seedProblems = [
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers that add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0, 1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1, 2]",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0, 1]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists",
    ],
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0, 1]", isHidden: false },
      { input: "[3,2,4], 6", expectedOutput: "[1, 2]", isHidden: false },
      { input: "[3,3], 6", expectedOutput: "[0, 1]", isHidden: false },
      { input: "[1,2,3,4,5], 9", expectedOutput: "[3, 4]", isHidden: true },
      {
        input: "[-1,-2,-3,-4,-5], -8",
        expectedOutput: "[2, 4]",
        isHidden: true,
      },
      { input: "[0,4,3,0], 0", expectedOutput: "[0, 3]", isHidden: true },
    ],
    starterCode: `def solution(nums: list, target: int) -> list:
    # Your code here
    pass`,
    functionName: "solution",
  },
  {
    slug: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    tags: ["String", "Two Pointers"],
    description: `Write a function that reverses a string and returns the reversed string.`,
    examples: [
      { input: 's = "hello"', output: '"olleh"' },
      { input: 's = "Hannah"', output: '"hannaH"' },
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s consists of printable ASCII characters",
    ],
    testCases: [
      { input: '"hello"', expectedOutput: '"olleh"', isHidden: false },
      { input: '"Hannah"', expectedOutput: '"hannaH"', isHidden: false },
      { input: '"a"', expectedOutput: '"a"', isHidden: true },
      { input: '"abcde"', expectedOutput: '"edcba"', isHidden: true },
      { input: '"racecar"', expectedOutput: '"racecar"', isHidden: true },
    ],
    starterCode: `def solution(s: str) -> str:
    # Your code here
    pass`,
    functionName: "solution",
  },
  {
    slug: "palindrome-check",
    title: "Palindrome Check",
    difficulty: "Easy",
    tags: ["String", "Two Pointers"],
    description: `Given a string \`s\`, return \`True\` if it is a palindrome, or \`False\` otherwise.

A string is a palindrome when it reads the same forward and backward.

**Note:** Consider only alphanumeric characters and ignore case.`,
    examples: [
      {
        input: 's = "A man a plan a canal Panama"',
        output: "True",
        explanation: '"amanaplanacanalpanama" is a palindrome',
      },
      { input: 's = "race a car"', output: "False" },
      {
        input: 's = " "',
        output: "True",
        explanation: "An empty string (after filtering) is a palindrome",
      },
    ],
    constraints: [
      "1 <= s.length <= 2 * 10^5",
      "s consists only of printable ASCII characters",
    ],
    testCases: [
      {
        input: '"A man a plan a canal Panama"',
        expectedOutput: "True",
        isHidden: false,
      },
      { input: '"race a car"', expectedOutput: "False", isHidden: false },
      { input: '" "', expectedOutput: "True", isHidden: false },
      { input: '"No lemon, no melon"', expectedOutput: "True", isHidden: true },
      { input: '"hello"', expectedOutput: "False", isHidden: true },
    ],
    starterCode: `def solution(s: str) -> bool:
    # Your code here
    pass`,
    functionName: "solution",
  },
  {
    slug: "fizzbuzz",
    title: "FizzBuzz",
    difficulty: "Easy",
    tags: ["Math", "String"],
    description: `Given an integer \`n\`, return a list of strings from \`1\` to \`n\` (inclusive) where:
- \`"Fizz"\` replaces multiples of 3
- \`"Buzz"\` replaces multiples of 5
- \`"FizzBuzz"\` replaces multiples of both 3 and 5
- The number itself (as a string) otherwise`,
    examples: [
      { input: "n = 3", output: '["1", "2", "Fizz"]' },
      { input: "n = 5", output: '["1", "2", "Fizz", "4", "Buzz"]' },
      {
        input: "n = 15",
        output:
          '["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]',
      },
    ],
    constraints: ["1 <= n <= 10^4"],
    testCases: [
      { input: "3", expectedOutput: '["1", "2", "Fizz"]', isHidden: false },
      {
        input: "5",
        expectedOutput: '["1", "2", "Fizz", "4", "Buzz"]',
        isHidden: false,
      },
      {
        input: "15",
        expectedOutput:
          '["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]',
        isHidden: false,
      },
      { input: "1", expectedOutput: '["1"]', isHidden: true },
      {
        input: "30",
        expectedOutput:
          '["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz", "16", "17", "Fizz", "19", "Buzz", "Fizz", "22", "23", "Fizz", "Buzz", "26", "Fizz", "28", "29", "FizzBuzz"]',
        isHidden: true,
      },
    ],
    starterCode: `def solution(n: int) -> list:
    # Your code here
    pass`,
    functionName: "solution",
  },
  {
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    tags: ["Array", "Dynamic Programming"],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum and return its sum.`,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6",
      },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    testCases: [
      {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        expectedOutput: "6",
        isHidden: false,
      },
      { input: "[1]", expectedOutput: "1", isHidden: false },
      { input: "[5,4,-1,7,8]", expectedOutput: "23", isHidden: false },
      { input: "[-1,-2,-3,-4]", expectedOutput: "-1", isHidden: true },
      { input: "[1,2,3,4,5]", expectedOutput: "15", isHidden: true },
      { input: "[-2,-1]", expectedOutput: "-1", isHidden: true },
    ],
    starterCode: `def solution(nums: list) -> int:
    # Your code here
    pass`,
    functionName: "solution",
  },
  {
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    tags: ["Stack", "String"],
    description: `Given a string \`s\` containing just the characters \`(\`, \`)\`, \`{\`, \`}\`, \`[\`, and \`]\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: "True" },
      { input: 's = "()[]{}"', output: "True" },
      { input: 's = "(]"', output: "False" },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'",
    ],
    testCases: [
      { input: '"()"', expectedOutput: "True", isHidden: false },
      { input: '"()[]{}"', expectedOutput: "True", isHidden: false },
      { input: '"(]"', expectedOutput: "False", isHidden: false },
      { input: '"([)]"', expectedOutput: "False", isHidden: true },
      { input: '"{[]}"', expectedOutput: "True", isHidden: true },
      { input: '"("', expectedOutput: "False", isHidden: true },
    ],
    starterCode: `def solution(s: str) -> bool:
    # Your code here
    pass`,
    functionName: "solution",
  },
  {
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    tags: ["Linked List", "Two Pointers"],
    description: `You are given two sorted integer lists \`list1\` and \`list2\`. Merge the two lists into one sorted list and return it.`,
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1, 1, 2, 3, 4, 4]",
      },
      { input: "list1 = [], list2 = []", output: "[]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: [
      "0 <= list1.length, list2.length <= 50",
      "-100 <= list1[i], list2[i] <= 100",
      "Both list1 and list2 are sorted in non-decreasing order",
    ],
    testCases: [
      {
        input: "[1,2,4], [1,3,4]",
        expectedOutput: "[1, 1, 2, 3, 4, 4]",
        isHidden: false,
      },
      { input: "[], []", expectedOutput: "[]", isHidden: false },
      { input: "[], [0]", expectedOutput: "[0]", isHidden: false },
      {
        input: "[1,3,5,7], [2,4,6,8]",
        expectedOutput: "[1, 2, 3, 4, 5, 6, 7, 8]",
        isHidden: true,
      },
      {
        input: "[1,1,1], [1,1,1]",
        expectedOutput: "[1, 1, 1, 1, 1, 1]",
        isHidden: true,
      },
    ],
    starterCode: `def solution(list1: list, list2: list) -> list:
    # Your code here
    pass`,
    functionName: "solution",
  },
  {
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    tags: ["Hash Table", "String", "Sliding Window"],
    description: `Given a string \`s\`, find the length of the longest substring without duplicate characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with length 3',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with length 1',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with length 3',
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols, and spaces",
    ],
    testCases: [
      { input: '"abcabcbb"', expectedOutput: "3", isHidden: false },
      { input: '"bbbbb"', expectedOutput: "1", isHidden: false },
      { input: '"pwwkew"', expectedOutput: "3", isHidden: false },
      { input: '""', expectedOutput: "0", isHidden: true },
      { input: '"dvdf"', expectedOutput: "3", isHidden: true },
      { input: '"aab"', expectedOutput: "2", isHidden: true },
    ],
    starterCode: `def solution(s: str) -> int:
    # Your code here
    pass`,
    functionName: "solution",
  },
  {
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    tags: ["Array", "Prefix Sum"],
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and **without** using the division operation.`,
    examples: [
      { input: "nums = [1,2,3,4]", output: "[24, 12, 8, 6]" },
      { input: "nums = [-1,1,0,-3,3]", output: "[0, 0, 9, 0, 0]" },
    ],
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix fits in a 32-bit integer",
    ],
    testCases: [
      { input: "[1,2,3,4]", expectedOutput: "[24, 12, 8, 6]", isHidden: false },
      {
        input: "[-1,1,0,-3,3]",
        expectedOutput: "[0, 0, 9, 0, 0]",
        isHidden: false,
      },
      { input: "[1,1]", expectedOutput: "[1, 1]", isHidden: true },
      {
        input: "[2,3,4,5]",
        expectedOutput: "[60, 40, 30, 24]",
        isHidden: true,
      },
      { input: "[0,0]", expectedOutput: "[0, 0]", isHidden: true },
    ],
    starterCode: `def solution(nums: list) -> list:
    # Your code here
    pass`,
    functionName: "solution",
  },
  {
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    tags: ["Array", "Binary Search"],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, return its index. Otherwise, return \`-1\`.

You must write an algorithm with O(log n) runtime complexity.`,
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums at index 4",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique",
      "nums is sorted in ascending order",
    ],
    testCases: [
      { input: "[-1,0,3,5,9,12], 9", expectedOutput: "4", isHidden: false },
      { input: "[-1,0,3,5,9,12], 2", expectedOutput: "-1", isHidden: false },
      { input: "[5], 5", expectedOutput: "0", isHidden: true },
      { input: "[1,2,3,4,5], 1", expectedOutput: "0", isHidden: true },
      { input: "[1,2,3,4,5], 5", expectedOutput: "4", isHidden: true },
      { input: "[1,2,3,4,5], 6", expectedOutput: "-1", isHidden: true },
    ],
    starterCode: `def solution(nums: list, target: int) -> int:
    # Your code here
    pass`,
    functionName: "solution",
  },
];
