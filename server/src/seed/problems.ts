export const seedProblems = [
  {
    "slug": "product-of-array-except-self",
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Prefix Sum"
    ],
    "description": "Return an array where `result[i]` is the product of all elements except `nums[i]` (no division).",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "[24, 12, 8, 6]"
      },
      {
        "input": "nums = [-1, 1, 0, -3, 3]",
        "output": "[0, 0, 9, 0, 0]"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "[1, 2, 3, 4]",
        "expectedOutput": "[24, 12, 8, 6]",
        "isHidden": false
      },
      {
        "input": "[-1, 1, 0, -3, 3]",
        "expectedOutput": "[0, 0, 9, 0, 0]",
        "isHidden": false
      },
      {
        "input": "[2, 3]",
        "expectedOutput": "[3, 2]",
        "isHidden": true
      },
      {
        "input": "[5, 1, 1]",
        "expectedOutput": "[1, 5, 5]",
        "isHidden": true
      },
      {
        "input": "[1, 1, 1]",
        "expectedOutput": "[1, 1, 1]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "edit-distance",
    "title": "Edit Distance",
    "difficulty": "Medium",
    "tags": [
      "String",
      "Dynamic Programming"
    ],
    "description": "Return the minimum number of insert/delete/replace operations to convert `word1` into `word2`.",
    "examples": [
      {
        "input": "word1 = 'horse', word2 = 'ros'",
        "output": "3"
      },
      {
        "input": "word1 = 'intention', word2 = 'execution'",
        "output": "5"
      }
    ],
    "constraints": [
      "0 <= word1.length, word2.length <= 500"
    ],
    "testCases": [
      {
        "input": "'horse', 'ros'",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "'intention', 'execution'",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "'', 'abc'",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "input": "'abc', 'abc'",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "'a', 'b'",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(word1: str, word2: str) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "coin-change",
    "title": "Coin Change",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "description": "Return the fewest coins needed to make `amount` from `coins` (each usable unlimited times), or -1 if impossible.",
    "examples": [
      {
        "input": "coins = [1, 2, 5], amount = 11",
        "output": "3"
      },
      {
        "input": "coins = [2], amount = 3",
        "output": "-1"
      }
    ],
    "constraints": [
      "1 <= coins.length <= 12",
      "0 <= amount <= 10^4"
    ],
    "testCases": [
      {
        "input": "[1, 2, 5], 11",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[2], 3",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "input": "[1], 0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[1, 3, 4], 6",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "input": "[5, 10], 7",
        "expectedOutput": "-1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(coins: list, amount: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "longest-repeating-character-replacement",
    "title": "Longest Repeating Character Replacement",
    "difficulty": "Medium",
    "tags": [
      "String",
      "Sliding Window"
    ],
    "description": "You may replace up to `k` characters. Return the length of the longest substring of one repeating letter achievable.",
    "examples": [
      {
        "input": "s = 'ABAB', k = 2",
        "output": "4"
      },
      {
        "input": "s = 'AABABBA', k = 1",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5",
      "0 <= k <= s.length"
    ],
    "testCases": [
      {
        "input": "'ABAB', 2",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "'AABABBA', 1",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "'AAAA', 0",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "input": "'ABCDE', 1",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "input": "'AABA', 0",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str, k: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "house-robber",
    "title": "House Robber",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "description": "You cannot rob two adjacent houses. Return the maximum total you can rob.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 1]",
        "output": "4"
      },
      {
        "input": "nums = [2, 7, 9, 3, 1]",
        "output": "12"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100"
    ],
    "testCases": [
      {
        "input": "[1, 2, 3, 1]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[2, 7, 9, 3, 1]",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "input": "[5]",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "input": "[2, 1, 1, 2]",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "input": "[0, 0, 0]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "permutation-in-string",
    "title": "Permutation in String",
    "difficulty": "Medium",
    "tags": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "description": "Return `true` if `s2` contains a contiguous substring that is a permutation of `s1`.",
    "examples": [
      {
        "input": "s1 = 'ab', s2 = 'eidbaooo'",
        "output": "True"
      },
      {
        "input": "s1 = 'ab', s2 = 'eidboaoo'",
        "output": "False"
      }
    ],
    "constraints": [
      "1 <= s1.length <= s2.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "'ab', 'eidbaooo'",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "'ab', 'eidboaoo'",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "'a', 'a'",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "'abc', 'bbbca'",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "'xy', 'yxabc'",
        "expectedOutput": "True",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s1: str, s2: str) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "fizz-buzz",
    "title": "Fizz Buzz",
    "difficulty": "Easy",
    "tags": [
      "Math",
      "String",
      "Simulation"
    ],
    "description": "Return a list of strings 1..n where multiples of 3 are \"Fizz\", of 5 are \"Buzz\", of both are \"FizzBuzz\", else the number.",
    "examples": [
      {
        "input": "n = 3",
        "output": "[\"1\", \"2\", \"Fizz\"]"
      },
      {
        "input": "n = 5",
        "output": "[\"1\", \"2\", \"Fizz\", \"4\", \"Buzz\"]"
      }
    ],
    "constraints": [
      "1 <= n <= 10^4"
    ],
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "[\"1\", \"2\", \"Fizz\"]",
        "isHidden": false
      },
      {
        "input": "5",
        "expectedOutput": "[\"1\", \"2\", \"Fizz\", \"4\", \"Buzz\"]",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "[\"1\"]",
        "isHidden": true
      },
      {
        "input": "15",
        "expectedOutput": "[\"1\", \"2\", \"Fizz\", \"4\", \"Buzz\", \"Fizz\", \"7\", \"8\", \"Fizz\", \"Buzz\", \"11\", \"Fizz\", \"13\", \"14\", \"FizzBuzz\"]",
        "isHidden": true
      },
      {
        "input": "16",
        "expectedOutput": "[\"1\", \"2\", \"Fizz\", \"4\", \"Buzz\", \"Fizz\", \"7\", \"8\", \"Fizz\", \"Buzz\", \"11\", \"Fizz\", \"13\", \"14\", \"FizzBuzz\", \"16\"]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(n: int) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "maximum-subarray",
    "title": "Maximum Subarray",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "description": "Return the largest sum of any contiguous non-empty subarray of `nums`.",
    "examples": [
      {
        "input": "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        "output": "6"
      },
      {
        "input": "nums = [1]",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "[-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[5, 4, -1, 7, 8]",
        "expectedOutput": "23",
        "isHidden": true
      },
      {
        "input": "[-1, -2, -3]",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "input": "[-2, -1]",
        "expectedOutput": "-1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "number-of-islands",
    "title": "Number of Islands",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Depth-First Search",
      "Matrix"
    ],
    "description": "Given a grid of 1s (land) and 0s (water), return the number of islands (4-directionally connected land).",
    "examples": [
      {
        "input": "grid = [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]",
        "output": "3"
      },
      {
        "input": "grid = [[1, 1, 1], [0, 1, 0], [1, 1, 1]]",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= rows, cols <= 300"
    ],
    "testCases": [
      {
        "input": "[[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[[1, 1, 1], [0, 1, 0], [1, 1, 1]]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[[0]]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[[1]]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[[1, 0, 1, 0, 1]]",
        "expectedOutput": "3",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(grid: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Hash Table"
    ],
    "description": "Given an array of integers `nums` and an integer `target`, return the indices `[i, j]` (with `i < j`) of the two numbers that add up to `target`. Exactly one solution exists.",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]"
      },
      {
        "input": "nums = [3, 2, 4], target = 6",
        "output": "[1, 2]"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "Exactly one valid answer exists"
    ],
    "testCases": [
      {
        "input": "[2, 7, 11, 15], 9",
        "expectedOutput": "[0, 1]",
        "isHidden": false
      },
      {
        "input": "[3, 2, 4], 6",
        "expectedOutput": "[1, 2]",
        "isHidden": false
      },
      {
        "input": "[3, 3], 6",
        "expectedOutput": "[0, 1]",
        "isHidden": true
      },
      {
        "input": "[1, 2, 3, 4, 5], 9",
        "expectedOutput": "[3, 4]",
        "isHidden": true
      },
      {
        "input": "[-1, -2, -3, -4], -7",
        "expectedOutput": "[2, 3]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list, target: int) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "next-greater-element-i",
    "title": "Next Greater Element I",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Stack",
      "Hash Table"
    ],
    "description": "For each value in `nums1` (a subset of `nums2`), return the next greater element to its right in `nums2`, or -1.",
    "examples": [
      {
        "input": "nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2]",
        "output": "[-1, 3, -1]"
      },
      {
        "input": "nums1 = [2, 4], nums2 = [1, 2, 3, 4]",
        "output": "[3, -1]"
      }
    ],
    "constraints": [
      "1 <= nums1.length <= nums2.length <= 1000"
    ],
    "testCases": [
      {
        "input": "[4, 1, 2], [1, 3, 4, 2]",
        "expectedOutput": "[-1, 3, -1]",
        "isHidden": false
      },
      {
        "input": "[2, 4], [1, 2, 3, 4]",
        "expectedOutput": "[3, -1]",
        "isHidden": false
      },
      {
        "input": "[1], [1]",
        "expectedOutput": "[-1]",
        "isHidden": true
      },
      {
        "input": "[3, 1], [1, 2, 3]",
        "expectedOutput": "[-1, 2]",
        "isHidden": true
      },
      {
        "input": "[5], [5, 4, 3]",
        "expectedOutput": "[-1]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums1: list, nums2: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "minimum-path-sum",
    "title": "Minimum Path Sum",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Dynamic Programming",
      "Matrix"
    ],
    "description": "Moving only right or down, return the minimum sum of values along a path from top-left to bottom-right.",
    "examples": [
      {
        "input": "grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]",
        "output": "7"
      },
      {
        "input": "grid = [[1, 2, 3], [4, 5, 6]]",
        "output": "12"
      }
    ],
    "constraints": [
      "1 <= rows, cols <= 200"
    ],
    "testCases": [
      {
        "input": "[[1, 3, 1], [1, 5, 1], [4, 2, 1]]",
        "expectedOutput": "7",
        "isHidden": false
      },
      {
        "input": "[[1, 2, 3], [4, 5, 6]]",
        "expectedOutput": "12",
        "isHidden": false
      },
      {
        "input": "[[1]]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[[1, 2], [1, 1]]",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "input": "[[5]]",
        "expectedOutput": "5",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(grid: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "decode-ways",
    "title": "Decode Ways",
    "difficulty": "Medium",
    "tags": [
      "String",
      "Dynamic Programming"
    ],
    "description": "Digits map to letters (1->A ... 26->Z). Return the number of ways to decode the digit string `s`.",
    "examples": [
      {
        "input": "s = '12'",
        "output": "2"
      },
      {
        "input": "s = '226'",
        "output": "3"
      }
    ],
    "constraints": [
      "1 <= s.length <= 100"
    ],
    "testCases": [
      {
        "input": "'12'",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "'226'",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "'06'",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "'11106'",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "input": "'10'",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "gas-station",
    "title": "Gas Station",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Greedy"
    ],
    "description": "Return the starting gas station index from which you can travel the circular route once, or -1.",
    "examples": [
      {
        "input": "gas = [1, 2, 3, 4, 5], cost = [3, 4, 5, 1, 2]",
        "output": "3"
      },
      {
        "input": "gas = [2, 3, 4], cost = [3, 4, 3]",
        "output": "-1"
      }
    ],
    "constraints": [
      "1 <= gas.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[2, 3, 4], [3, 4, 3]",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "input": "[5], [4]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[3, 1, 1], [1, 2, 2]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[4, 5, 2, 6, 5, 3], [3, 2, 7, 3, 2, 9]",
        "expectedOutput": "-1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(gas: list, cost: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "minimum-size-subarray-sum",
    "title": "Minimum Size Subarray Sum",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Sliding Window"
    ],
    "description": "Return the minimal length of a contiguous subarray whose sum is >= `target`, or 0 if none.",
    "examples": [
      {
        "input": "target = 7, nums = [2, 3, 1, 2, 4, 3]",
        "output": "2"
      },
      {
        "input": "target = 4, nums = [1, 4, 4]",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "1 <= target <= 10^9"
    ],
    "testCases": [
      {
        "input": "7, [2, 3, 1, 2, 4, 3]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "4, [1, 4, 4]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "11, [1, 1, 1, 1]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "15, [1, 2, 3, 4, 5]",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "input": "6, [10]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(target: int, nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "sort-colors",
    "title": "Sort Colors",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "description": "Given an array of 0s, 1s and 2s, return it sorted so that same colors are adjacent in the order 0,1,2.",
    "examples": [
      {
        "input": "nums = [2, 0, 2, 1, 1, 0]",
        "output": "[0, 0, 1, 1, 2, 2]"
      },
      {
        "input": "nums = [2, 0, 1]",
        "output": "[0, 1, 2]"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 300",
      "nums[i] in {0,1,2}"
    ],
    "testCases": [
      {
        "input": "[2, 0, 2, 1, 1, 0]",
        "expectedOutput": "[0, 0, 1, 1, 2, 2]",
        "isHidden": false
      },
      {
        "input": "[2, 0, 1]",
        "expectedOutput": "[0, 1, 2]",
        "isHidden": false
      },
      {
        "input": "[0]",
        "expectedOutput": "[0]",
        "isHidden": true
      },
      {
        "input": "[1, 2, 0, 0, 2, 1]",
        "expectedOutput": "[0, 0, 1, 1, 2, 2]",
        "isHidden": true
      },
      {
        "input": "[2, 2, 1, 1, 0, 0]",
        "expectedOutput": "[0, 0, 1, 1, 2, 2]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "subsets",
    "title": "Subsets",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Backtracking",
      "Bit Manipulation"
    ],
    "description": "Return all subsets of the distinct array `nums`, sorted by length then lexicographically.",
    "examples": [
      {
        "input": "nums = [1, 2, 3]",
        "output": "[[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]"
      },
      {
        "input": "nums = [0]",
        "output": "[[], [0]]"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10",
      "All elements distinct"
    ],
    "testCases": [
      {
        "input": "[1, 2, 3]",
        "expectedOutput": "[[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]",
        "isHidden": false
      },
      {
        "input": "[0]",
        "expectedOutput": "[[], [0]]",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "[[], [1]]",
        "isHidden": true
      },
      {
        "input": "[2, 4]",
        "expectedOutput": "[[], [2], [4], [2, 4]]",
        "isHidden": true
      },
      {
        "input": "[5, 6, 7]",
        "expectedOutput": "[[], [5], [6], [7], [5, 6], [5, 7], [6, 7], [5, 6, 7]]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "largest-rectangle-in-histogram",
    "title": "Largest Rectangle in Histogram",
    "difficulty": "Hard",
    "tags": [
      "Array",
      "Stack",
      "Monotonic Stack"
    ],
    "description": "Each value is a bar height of width 1. Return the area of the largest rectangle in the histogram.",
    "examples": [
      {
        "input": "heights = [2, 1, 5, 6, 2, 3]",
        "output": "10"
      },
      {
        "input": "heights = [2, 4]",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= heights.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "[2, 1, 5, 6, 2, 3]",
        "expectedOutput": "10",
        "isHidden": false
      },
      {
        "input": "[2, 4]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[5, 5, 5]",
        "expectedOutput": "15",
        "isHidden": true
      },
      {
        "input": "[6, 2, 5, 4, 5, 1, 6]",
        "expectedOutput": "12",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(heights: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "excel-sheet-column-number",
    "title": "Excel Sheet Column Number",
    "difficulty": "Easy",
    "tags": [
      "Math",
      "String"
    ],
    "description": "Given a column title as it appears in a spreadsheet (\"A\", \"B\", ..., \"Z\", \"AA\", ...), return its column number.",
    "examples": [
      {
        "input": "columnTitle = 'A'",
        "output": "1"
      },
      {
        "input": "columnTitle = 'AB'",
        "output": "28"
      }
    ],
    "constraints": [
      "1 <= columnTitle.length <= 7"
    ],
    "testCases": [
      {
        "input": "'A'",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "'AB'",
        "expectedOutput": "28",
        "isHidden": false
      },
      {
        "input": "'ZY'",
        "expectedOutput": "701",
        "isHidden": true
      },
      {
        "input": "'Z'",
        "expectedOutput": "26",
        "isHidden": true
      },
      {
        "input": "'AAA'",
        "expectedOutput": "703",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(columnTitle: str) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "minimum-number-of-arrows-to-burst-balloons",
    "title": "Minimum Number of Arrows to Burst Balloons",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Greedy",
      "Sorting",
      "Intervals"
    ],
    "description": "Each balloon spans [start, end]. Return the minimum number of vertical arrows to burst them all.",
    "examples": [
      {
        "input": "points = [[10, 16], [2, 8], [1, 6], [7, 12]]",
        "output": "2"
      },
      {
        "input": "points = [[1, 2], [3, 4], [5, 6], [7, 8]]",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= points.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "[[10, 16], [2, 8], [1, 6], [7, 12]]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[[1, 2], [3, 4], [5, 6], [7, 8]]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[[1, 2], [2, 3], [3, 4], [4, 5]]",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "input": "[[1, 2]]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[[2, 3], [2, 3]]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(points: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "move-zeroes",
    "title": "Move Zeroes",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Two Pointers"
    ],
    "description": "Move all zeroes to the end while keeping the relative order of non-zero elements. Return the resulting array.",
    "examples": [
      {
        "input": "nums = [0, 1, 0, 3, 12]",
        "output": "[1, 3, 12, 0, 0]"
      },
      {
        "input": "nums = [0]",
        "output": "[0]"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "[0, 1, 0, 3, 12]",
        "expectedOutput": "[1, 3, 12, 0, 0]",
        "isHidden": false
      },
      {
        "input": "[0]",
        "expectedOutput": "[0]",
        "isHidden": false
      },
      {
        "input": "[1, 0, 1]",
        "expectedOutput": "[1, 1, 0]",
        "isHidden": true
      },
      {
        "input": "[0, 0, 1]",
        "expectedOutput": "[1, 0, 0]",
        "isHidden": true
      },
      {
        "input": "[2, 0, 0, 3]",
        "expectedOutput": "[2, 3, 0, 0]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "search-a-2d-matrix",
    "title": "Search a 2D Matrix",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Binary Search",
      "Matrix"
    ],
    "description": "Each row is sorted and the first value of each row exceeds the last of the previous. Return `true` if `target` is present.",
    "examples": [
      {
        "input": "matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 3",
        "output": "True"
      },
      {
        "input": "matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target = 13",
        "output": "False"
      }
    ],
    "constraints": [
      "1 <= rows, cols <= 100"
    ],
    "testCases": [
      {
        "input": "[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "[[1]], 1",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "[[1, 2]], 2",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "[[1], [3]], 2",
        "expectedOutput": "False",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(matrix: list, target: int) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "power-of-three",
    "title": "Power of Three",
    "difficulty": "Easy",
    "tags": [
      "Math"
    ],
    "description": "Return `true` if `n` is a power of three.",
    "examples": [
      {
        "input": "n = 27",
        "output": "True"
      },
      {
        "input": "n = 0",
        "output": "False"
      }
    ],
    "constraints": [
      "-2^31 <= n <= 2^31 - 1"
    ],
    "testCases": [
      {
        "input": "27",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "9",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "45",
        "expectedOutput": "False",
        "isHidden": true
      },
      {
        "input": "1",
        "expectedOutput": "True",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(n: int) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "reverse-bits",
    "title": "Reverse Bits",
    "difficulty": "Easy",
    "tags": [
      "Bit Manipulation"
    ],
    "description": "Reverse the bits of a 32-bit unsigned integer and return the result.",
    "examples": [
      {
        "input": "n = 43261596",
        "output": "964176192"
      },
      {
        "input": "n = 4294967293",
        "output": "3221225471"
      }
    ],
    "constraints": [
      "0 <= n <= 2^32 - 1"
    ],
    "testCases": [
      {
        "input": "43261596",
        "expectedOutput": "964176192",
        "isHidden": false
      },
      {
        "input": "4294967293",
        "expectedOutput": "3221225471",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "1",
        "expectedOutput": "2147483648",
        "isHidden": true
      },
      {
        "input": "2147483648",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(n: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "climbing-stairs",
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "tags": [
      "Math",
      "Dynamic Programming"
    ],
    "description": "You climb 1 or 2 steps at a time. Return the number of distinct ways to reach the top of `n` stairs.",
    "examples": [
      {
        "input": "n = 2",
        "output": "2"
      },
      {
        "input": "n = 3",
        "output": "3"
      }
    ],
    "constraints": [
      "1 <= n <= 45"
    ],
    "testCases": [
      {
        "input": "2",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "3",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "5",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "input": "10",
        "expectedOutput": "89",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(n: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "coin-change-ii",
    "title": "Coin Change II",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "description": "Return the number of distinct combinations of `coins` that sum to `amount`.",
    "examples": [
      {
        "input": "amount = 5, coins = [1, 2, 5]",
        "output": "4"
      },
      {
        "input": "amount = 3, coins = [2]",
        "output": "0"
      }
    ],
    "constraints": [
      "1 <= coins.length <= 300",
      "0 <= amount <= 5000"
    ],
    "testCases": [
      {
        "input": "5, [1, 2, 5]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "3, [2]",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "10, [10]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "0, [3, 5]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "4, [1, 2, 3]",
        "expectedOutput": "4",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(amount: int, coins: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "longest-palindromic-substring",
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "tags": [
      "String",
      "Dynamic Programming",
      "Two Pointers"
    ],
    "description": "Return the longest palindromic substring of `s` (the leftmost if several share the max length).",
    "examples": [
      {
        "input": "s = 'babad'",
        "output": "\"bab\""
      },
      {
        "input": "s = 'cbbd'",
        "output": "\"bb\""
      }
    ],
    "constraints": [
      "1 <= s.length <= 1000"
    ],
    "testCases": [
      {
        "input": "'babad'",
        "expectedOutput": "\"bab\"",
        "isHidden": false
      },
      {
        "input": "'cbbd'",
        "expectedOutput": "\"bb\"",
        "isHidden": false
      },
      {
        "input": "'a'",
        "expectedOutput": "\"a\"",
        "isHidden": true
      },
      {
        "input": "'racecar'",
        "expectedOutput": "\"racecar\"",
        "isHidden": true
      },
      {
        "input": "'abccba'",
        "expectedOutput": "\"abccba\"",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str) -> str:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "longest-increasing-subsequence",
    "title": "Longest Increasing Subsequence",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Binary Search",
      "Dynamic Programming"
    ],
    "description": "Return the length of the longest strictly increasing subsequence of `nums`.",
    "examples": [
      {
        "input": "nums = [10, 9, 2, 5, 3, 7, 101, 18]",
        "output": "4"
      },
      {
        "input": "nums = [0, 1, 0, 3, 2, 3]",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2500"
    ],
    "testCases": [
      {
        "input": "[10, 9, 2, 5, 3, 7, 101, 18]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[0, 1, 0, 3, 2, 3]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[7, 7, 7, 7]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[1]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[4, 10, 4, 3, 8, 9]",
        "expectedOutput": "3",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "find-pivot-index",
    "title": "Find Pivot Index",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Prefix Sum"
    ],
    "description": "Return the leftmost index where the sum of values to its left equals the sum to its right, or -1.",
    "examples": [
      {
        "input": "nums = [1, 7, 3, 6, 5, 6]",
        "output": "3"
      },
      {
        "input": "nums = [1, 2, 3]",
        "output": "-1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "[1, 7, 3, 6, 5, 6]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[1, 2, 3]",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "input": "[2, 1, -1]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[0]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[-1, -1, -1, 0, 1, 1]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "jump-game-ii",
    "title": "Jump Game II",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Greedy",
      "Dynamic Programming"
    ],
    "description": "Return the minimum number of jumps to reach the last index (you can always reach it).",
    "examples": [
      {
        "input": "nums = [2, 3, 1, 1, 4]",
        "output": "2"
      },
      {
        "input": "nums = [2, 3, 0, 1, 4]",
        "output": "2"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "[2, 3, 1, 1, 4]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[2, 3, 0, 1, 4]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[1, 1, 1, 1]",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "input": "[5, 1, 1, 1, 1]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "trapping-rain-water",
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "tags": [
      "Array",
      "Two Pointers",
      "Stack"
    ],
    "description": "Given an elevation map, return how many units of rain water can be trapped between the bars.",
    "examples": [
      {
        "input": "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        "output": "6"
      },
      {
        "input": "height = [4, 2, 0, 3, 2, 5]",
        "output": "9"
      }
    ],
    "constraints": [
      "1 <= height.length <= 2 * 10^4"
    ],
    "testCases": [
      {
        "input": "[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "[4, 2, 0, 3, 2, 5]",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "input": "[1, 2, 3]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[3, 0, 3]",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "input": "[5, 4, 1, 2]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(height: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "unique-paths",
    "title": "Unique Paths",
    "difficulty": "Medium",
    "tags": [
      "Math",
      "Dynamic Programming"
    ],
    "description": "A robot moves only right or down on an m x n grid from top-left to bottom-right. Return the number of unique paths.",
    "examples": [
      {
        "input": "m = 3, n = 7",
        "output": "28"
      },
      {
        "input": "m = 3, n = 2",
        "output": "3"
      }
    ],
    "constraints": [
      "1 <= m, n <= 100"
    ],
    "testCases": [
      {
        "input": "3, 7",
        "expectedOutput": "28",
        "isHidden": false
      },
      {
        "input": "3, 2",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "1, 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "3, 3",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "input": "7, 3",
        "expectedOutput": "28",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(m: int, n: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "rotate-image",
    "title": "Rotate Image",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Math",
      "Matrix"
    ],
    "description": "Rotate the n x n matrix 90 degrees clockwise and return the resulting matrix.",
    "examples": [
      {
        "input": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "output": "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]"
      },
      {
        "input": "matrix = [[1, 2], [3, 4]]",
        "output": "[[3, 1], [4, 2]]"
      }
    ],
    "constraints": [
      "1 <= n <= 20"
    ],
    "testCases": [
      {
        "input": "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "expectedOutput": "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]",
        "isHidden": false
      },
      {
        "input": "[[1, 2], [3, 4]]",
        "expectedOutput": "[[3, 1], [4, 2]]",
        "isHidden": false
      },
      {
        "input": "[[1]]",
        "expectedOutput": "[[1]]",
        "isHidden": true
      },
      {
        "input": "[[5, 1], [2, 8]]",
        "expectedOutput": "[[2, 5], [8, 1]]",
        "isHidden": true
      },
      {
        "input": "[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]",
        "expectedOutput": "[[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(matrix: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "valid-anagram",
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "tags": [
      "String",
      "Hash Table",
      "Sorting"
    ],
    "description": "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`.",
    "examples": [
      {
        "input": "s = 'anagram', t = 'nagaram'",
        "output": "True"
      },
      {
        "input": "s = 'rat', t = 'car'",
        "output": "False"
      }
    ],
    "constraints": [
      "1 <= s.length, t.length <= 5 * 10^4"
    ],
    "testCases": [
      {
        "input": "'anagram', 'nagaram'",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "'rat', 'car'",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "'a', 'a'",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "'ab', 'ba'",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "'listen', 'silentt'",
        "expectedOutput": "False",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str, t: str) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "two-sum-ii",
    "title": "Two Sum II - Input Array Is Sorted",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Two Pointers",
      "Binary Search"
    ],
    "description": "Given a 1-indexed sorted array, return the 1-based indices `[i, j]` of the two numbers adding to `target`.",
    "examples": [
      {
        "input": "numbers = [2, 7, 11, 15], target = 9",
        "output": "[1, 2]"
      },
      {
        "input": "numbers = [2, 3, 4], target = 6",
        "output": "[1, 3]"
      }
    ],
    "constraints": [
      "2 <= numbers.length <= 3 * 10^4",
      "Exactly one solution exists"
    ],
    "testCases": [
      {
        "input": "[2, 7, 11, 15], 9",
        "expectedOutput": "[1, 2]",
        "isHidden": false
      },
      {
        "input": "[2, 3, 4], 6",
        "expectedOutput": "[1, 3]",
        "isHidden": false
      },
      {
        "input": "[-1, 0], -1",
        "expectedOutput": "[1, 2]",
        "isHidden": true
      },
      {
        "input": "[1, 2, 3, 4, 4, 9, 56, 90], 8",
        "expectedOutput": "[4, 5]",
        "isHidden": true
      },
      {
        "input": "[5, 25, 75], 100",
        "expectedOutput": "[2, 3]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(numbers: list, target: int) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "contains-duplicate",
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Hash Table"
    ],
    "description": "Return `true` if any value appears at least twice in `nums`, otherwise `false`.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 1]",
        "output": "True"
      },
      {
        "input": "nums = [1, 2, 3, 4]",
        "output": "False"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "[1, 2, 3, 1]",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "[1, 2, 3, 4]",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "[1, 1, 1, 1]",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "[7]",
        "expectedOutput": "False",
        "isHidden": true
      },
      {
        "input": "[5, 6, 7, 8, 9, 5]",
        "expectedOutput": "True",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "palindrome-number",
    "title": "Palindrome Number",
    "difficulty": "Easy",
    "tags": [
      "Math"
    ],
    "description": "Return `true` if the integer `x` reads the same forwards and backwards.",
    "examples": [
      {
        "input": "x = 121",
        "output": "True"
      },
      {
        "input": "x = -121",
        "output": "False"
      }
    ],
    "constraints": [
      "-2^31 <= x <= 2^31 - 1"
    ],
    "testCases": [
      {
        "input": "121",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "-121",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "10",
        "expectedOutput": "False",
        "isHidden": true
      },
      {
        "input": "0",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "12321",
        "expectedOutput": "True",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(x: int) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "word-break",
    "title": "Word Break",
    "difficulty": "Medium",
    "tags": [
      "String",
      "Dynamic Programming",
      "Hash Table"
    ],
    "description": "Return `true` if `s` can be segmented into a space-separated sequence of words from `wordDict`.",
    "examples": [
      {
        "input": "s = 'leetcode', wordDict = ['leet', 'code']",
        "output": "True"
      },
      {
        "input": "s = 'applepenapple', wordDict = ['apple', 'pen']",
        "output": "True"
      }
    ],
    "constraints": [
      "1 <= s.length <= 300"
    ],
    "testCases": [
      {
        "input": "'leetcode', ['leet', 'code']",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "'applepenapple', ['apple', 'pen']",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "'catsandog', ['cats', 'dog', 'sand', 'and', 'cat']",
        "expectedOutput": "False",
        "isHidden": true
      },
      {
        "input": "'a', ['a']",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "'aaaa', ['aaa']",
        "expectedOutput": "False",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str, wordDict: list) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "maximal-square",
    "title": "Maximal Square",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Dynamic Programming",
      "Matrix"
    ],
    "description": "Given a binary matrix (0s and 1s), return the area of the largest square containing only 1s.",
    "examples": [
      {
        "input": "matrix = [[1, 0, 1, 0, 0], [1, 0, 1, 1, 1], [1, 1, 1, 1, 1], [1, 0, 0, 1, 0]]",
        "output": "4"
      },
      {
        "input": "matrix = [[0, 1], [1, 0]]",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= rows, cols <= 300"
    ],
    "testCases": [
      {
        "input": "[[1, 0, 1, 0, 0], [1, 0, 1, 1, 1], [1, 1, 1, 1, 1], [1, 0, 0, 1, 0]]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[[0, 1], [1, 0]]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[[0]]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[[1]]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[[1, 1], [1, 1]]",
        "expectedOutput": "4",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(matrix: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "longest-common-subsequence",
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "tags": [
      "String",
      "Dynamic Programming"
    ],
    "description": "Return the length of the longest subsequence common to both strings.",
    "examples": [
      {
        "input": "text1 = 'abcde', text2 = 'ace'",
        "output": "3"
      },
      {
        "input": "text1 = 'abc', text2 = 'abc'",
        "output": "3"
      }
    ],
    "constraints": [
      "1 <= text1.length, text2.length <= 1000"
    ],
    "testCases": [
      {
        "input": "'abcde', 'ace'",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "'abc', 'abc'",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "'abc', 'def'",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "'bsbininm', 'jmjkbkjkv'",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "'a', 'a'",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(text1: str, text2: str) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "evaluate-reverse-polish-notation",
    "title": "Evaluate Reverse Polish Notation",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Stack",
      "Math"
    ],
    "description": "Evaluate the arithmetic expression in Reverse Polish Notation. Division truncates toward zero.",
    "examples": [
      {
        "input": "tokens = ['2', '1', '+', '3', '*']",
        "output": "9"
      },
      {
        "input": "tokens = ['4', '13', '5', '/', '+']",
        "output": "6"
      }
    ],
    "constraints": [
      "1 <= tokens.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "['2', '1', '+', '3', '*']",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "input": "['4', '13', '5', '/', '+']",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']",
        "expectedOutput": "22",
        "isHidden": true
      },
      {
        "input": "['3', '4', '+']",
        "expectedOutput": "7",
        "isHidden": true
      },
      {
        "input": "['5', '1', '2', '+', '4', '*', '+', '3', '-']",
        "expectedOutput": "14",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(tokens: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "koko-eating-bananas",
    "title": "Koko Eating Bananas",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Binary Search"
    ],
    "description": "Koko eats `k` bananas/hour from one pile each hour. Return the minimum `k` to finish all piles within `h` hours.",
    "examples": [
      {
        "input": "piles = [3, 6, 7, 11], h = 8",
        "output": "4"
      },
      {
        "input": "piles = [30, 11, 23, 4, 20], h = 5",
        "output": "30"
      }
    ],
    "constraints": [
      "1 <= piles.length <= 10^4",
      "piles.length <= h <= 10^9"
    ],
    "testCases": [
      {
        "input": "[3, 6, 7, 11], 8",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[30, 11, 23, 4, 20], 5",
        "expectedOutput": "30",
        "isHidden": false
      },
      {
        "input": "[30, 11, 23, 4, 20], 6",
        "expectedOutput": "23",
        "isHidden": true
      },
      {
        "input": "[1], 1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[1000000000], 2",
        "expectedOutput": "500000000",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(piles: list, h: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "squares-of-a-sorted-array",
    "title": "Squares of a Sorted Array",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "description": "Given a sorted array, return a sorted array of the squares of each number.",
    "examples": [
      {
        "input": "nums = [-4, -1, 0, 3, 10]",
        "output": "[0, 1, 9, 16, 100]"
      },
      {
        "input": "nums = [-7, -3, 2, 3, 11]",
        "output": "[4, 9, 9, 49, 121]"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "nums is sorted ascending"
    ],
    "testCases": [
      {
        "input": "[-4, -1, 0, 3, 10]",
        "expectedOutput": "[0, 1, 9, 16, 100]",
        "isHidden": false
      },
      {
        "input": "[-7, -3, 2, 3, 11]",
        "expectedOutput": "[4, 9, 9, 49, 121]",
        "isHidden": false
      },
      {
        "input": "[0]",
        "expectedOutput": "[0]",
        "isHidden": true
      },
      {
        "input": "[-2, -1]",
        "expectedOutput": "[1, 4]",
        "isHidden": true
      },
      {
        "input": "[1, 2, 3]",
        "expectedOutput": "[1, 4, 9]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "insert-interval",
    "title": "Insert Interval",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Intervals"
    ],
    "description": "Insert `newInterval` into the sorted, non-overlapping `intervals`, merging as needed. Return the result.",
    "examples": [
      {
        "input": "intervals = [[1, 3], [6, 9]], newInterval = [2, 5]",
        "output": "[[1, 5], [6, 9]]"
      },
      {
        "input": "intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval = [4, 8]",
        "output": "[[1, 2], [3, 10], [12, 16]]"
      }
    ],
    "constraints": [
      "0 <= intervals.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "[[1, 3], [6, 9]], [2, 5]",
        "expectedOutput": "[[1, 5], [6, 9]]",
        "isHidden": false
      },
      {
        "input": "[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]",
        "expectedOutput": "[[1, 2], [3, 10], [12, 16]]",
        "isHidden": false
      },
      {
        "input": "[], [5, 7]",
        "expectedOutput": "[[5, 7]]",
        "isHidden": true
      },
      {
        "input": "[[1, 5]], [2, 3]",
        "expectedOutput": "[[1, 5]]",
        "isHidden": true
      },
      {
        "input": "[[1, 5]], [6, 8]",
        "expectedOutput": "[[1, 5], [6, 8]]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(intervals: list, newInterval: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "find-all-anagrams-in-a-string",
    "title": "Find All Anagrams in a String",
    "difficulty": "Medium",
    "tags": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "description": "Return the start indices of all substrings of `s` that are anagrams of `p`, in ascending order.",
    "examples": [
      {
        "input": "s = 'cbaebabacd', p = 'abc'",
        "output": "[0, 6]"
      },
      {
        "input": "s = 'abab', p = 'ab'",
        "output": "[0, 1, 2]"
      }
    ],
    "constraints": [
      "1 <= s.length, p.length <= 3 * 10^4"
    ],
    "testCases": [
      {
        "input": "'cbaebabacd', 'abc'",
        "expectedOutput": "[0, 6]",
        "isHidden": false
      },
      {
        "input": "'abab', 'ab'",
        "expectedOutput": "[0, 1, 2]",
        "isHidden": false
      },
      {
        "input": "'aa', 'bb'",
        "expectedOutput": "[]",
        "isHidden": true
      },
      {
        "input": "'a', 'a'",
        "expectedOutput": "[0]",
        "isHidden": true
      },
      {
        "input": "'baa', 'aa'",
        "expectedOutput": "[1]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str, p: str) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "3sum",
    "title": "3Sum",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Two Pointers",
      "Sorting"
    ],
    "description": "Return all unique triplets `[a, b, c]` with `a + b + c == 0`. Each triplet sorted ascending; the list of triplets sorted ascending.",
    "examples": [
      {
        "input": "nums = [-1, 0, 1, 2, -1, -4]",
        "output": "[[-1, -1, 2], [-1, 0, 1]]"
      },
      {
        "input": "nums = [0, 1, 1]",
        "output": "[]"
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000"
    ],
    "testCases": [
      {
        "input": "[-1, 0, 1, 2, -1, -4]",
        "expectedOutput": "[[-1, -1, 2], [-1, 0, 1]]",
        "isHidden": false
      },
      {
        "input": "[0, 1, 1]",
        "expectedOutput": "[]",
        "isHidden": false
      },
      {
        "input": "[0, 0, 0]",
        "expectedOutput": "[[0, 0, 0]]",
        "isHidden": true
      },
      {
        "input": "[-2, 0, 1, 1, 2]",
        "expectedOutput": "[[-2, 0, 2], [-2, 1, 1]]",
        "isHidden": true
      },
      {
        "input": "[3, -2, 1, 0, -1, -1]",
        "expectedOutput": "[[-2, -1, 3], [-1, 0, 1]]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "unique-paths-ii",
    "title": "Unique Paths II",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Dynamic Programming",
      "Matrix"
    ],
    "description": "Same as Unique Paths, but cells with value 1 are obstacles. Return the number of unique paths.",
    "examples": [
      {
        "input": "obstacleGrid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]",
        "output": "2"
      },
      {
        "input": "obstacleGrid = [[0, 1], [0, 0]]",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= rows, cols <= 100"
    ],
    "testCases": [
      {
        "input": "[[0, 0, 0], [0, 1, 0], [0, 0, 0]]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[[0, 1], [0, 0]]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[[1]]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[[0, 0], [1, 1], [0, 0]]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[[0]]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(obstacleGrid: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "longest-consecutive-sequence",
    "title": "Longest Consecutive Sequence",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Hash Table"
    ],
    "description": "Return the length of the longest run of consecutive integers present in `nums` (any order).",
    "examples": [
      {
        "input": "nums = [100, 4, 200, 1, 3, 2]",
        "output": "4"
      },
      {
        "input": "nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]",
        "output": "9"
      }
    ],
    "constraints": [
      "0 <= nums.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "[100, 4, 200, 1, 3, 2]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]",
        "expectedOutput": "9",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[1]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[9, 1, 4, 7, 3, 2, 6, 5, 8]",
        "expectedOutput": "9",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "hamming-distance",
    "title": "Hamming Distance",
    "difficulty": "Easy",
    "tags": [
      "Bit Manipulation"
    ],
    "description": "Return the number of bit positions at which integers `x` and `y` differ.",
    "examples": [
      {
        "input": "x = 1, y = 4",
        "output": "2"
      },
      {
        "input": "x = 3, y = 1",
        "output": "1"
      }
    ],
    "constraints": [
      "0 <= x, y <= 2^31 - 1"
    ],
    "testCases": [
      {
        "input": "1, 4",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "3, 1",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "0, 0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "255, 0",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "input": "10, 5",
        "expectedOutput": "4",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(x: int, y: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "palindromic-substrings",
    "title": "Palindromic Substrings",
    "difficulty": "Medium",
    "tags": [
      "String",
      "Dynamic Programming",
      "Two Pointers"
    ],
    "description": "Return the number of palindromic substrings in `s` (substrings at different positions count separately).",
    "examples": [
      {
        "input": "s = 'abc'",
        "output": "3"
      },
      {
        "input": "s = 'aaa'",
        "output": "6"
      }
    ],
    "constraints": [
      "1 <= s.length <= 1000"
    ],
    "testCases": [
      {
        "input": "'abc'",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "'aaa'",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "'a'",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "'abba'",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "input": "'racecar'",
        "expectedOutput": "10",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "summary-ranges",
    "title": "Summary Ranges",
    "difficulty": "Easy",
    "tags": [
      "Array"
    ],
    "description": "Return the shortest sorted list of ranges that cover all numbers in the sorted distinct array, e.g. \"2->4\".",
    "examples": [
      {
        "input": "nums = [0, 1, 2, 4, 5, 7]",
        "output": "[\"0->2\", \"4->5\", \"7\"]"
      },
      {
        "input": "nums = [0, 2, 3, 4, 6, 8, 9]",
        "output": "[\"0\", \"2->4\", \"6\", \"8->9\"]"
      }
    ],
    "constraints": [
      "0 <= nums.length <= 20",
      "nums is sorted ascending, distinct"
    ],
    "testCases": [
      {
        "input": "[0, 1, 2, 4, 5, 7]",
        "expectedOutput": "[\"0->2\", \"4->5\", \"7\"]",
        "isHidden": false
      },
      {
        "input": "[0, 2, 3, 4, 6, 8, 9]",
        "expectedOutput": "[\"0\", \"2->4\", \"6\", \"8->9\"]",
        "isHidden": false
      },
      {
        "input": "[]",
        "expectedOutput": "[]",
        "isHidden": true
      },
      {
        "input": "[-1]",
        "expectedOutput": "[\"-1\"]",
        "isHidden": true
      },
      {
        "input": "[0, 1, 2, 3]",
        "expectedOutput": "[\"0->3\"]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "tags": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "description": "Return the length of the longest substring of `s` without repeating characters.",
    "examples": [
      {
        "input": "s = 'abcabcbb'",
        "output": "3"
      },
      {
        "input": "s = 'bbbbb'",
        "output": "1"
      }
    ],
    "constraints": [
      "0 <= s.length <= 5 * 10^4"
    ],
    "testCases": [
      {
        "input": "'abcabcbb'",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "'bbbbb'",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "'pwwkew'",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "input": "''",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "'dvdf'",
        "expectedOutput": "3",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "search-in-rotated-sorted-array",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Binary Search"
    ],
    "description": "Return the index of `target` in a rotated sorted distinct array, or -1.",
    "examples": [
      {
        "input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 0",
        "output": "4"
      },
      {
        "input": "nums = [4, 5, 6, 7, 0, 1, 2], target = 3",
        "output": "-1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5000",
      "All values distinct"
    ],
    "testCases": [
      {
        "input": "[4, 5, 6, 7, 0, 1, 2], 0",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[4, 5, 6, 7, 0, 1, 2], 3",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "input": "[1], 0",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "input": "[5, 1, 3], 5",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[6, 7, 8, 1, 2, 3, 4, 5], 4",
        "expectedOutput": "6",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list, target: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "best-time-to-buy-and-sell-stock",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "description": "Given daily `prices`, return the maximum profit from one buy and a later sell. If none, return 0.",
    "examples": [
      {
        "input": "prices = [7, 1, 5, 3, 6, 4]",
        "output": "5"
      },
      {
        "input": "prices = [7, 6, 4, 3, 1]",
        "output": "0"
      }
    ],
    "constraints": [
      "1 <= prices.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "[7, 1, 5, 3, 6, 4]",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "[7, 6, 4, 3, 1]",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "[1, 2]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[2, 4, 1]",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "input": "[3, 3, 5, 0, 0, 3, 1, 4]",
        "expectedOutput": "4",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(prices: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "binary-search",
    "title": "Binary Search",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Binary Search"
    ],
    "description": "Return the index of `target` in the sorted array `nums`, or -1 if absent.",
    "examples": [
      {
        "input": "nums = [-1, 0, 3, 5, 9, 12], target = 9",
        "output": "4"
      },
      {
        "input": "nums = [-1, 0, 3, 5, 9, 12], target = 2",
        "output": "-1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "nums is sorted ascending, distinct"
    ],
    "testCases": [
      {
        "input": "[-1, 0, 3, 5, 9, 12], 9",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[-1, 0, 3, 5, 9, 12], 2",
        "expectedOutput": "-1",
        "isHidden": false
      },
      {
        "input": "[5], 5",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[2, 5], 0",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "input": "[1, 2, 3, 4, 5], 4",
        "expectedOutput": "3",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list, target: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "add-binary",
    "title": "Add Binary",
    "difficulty": "Easy",
    "tags": [
      "Math",
      "String",
      "Bit Manipulation"
    ],
    "description": "Given two binary strings `a` and `b`, return their sum as a binary string.",
    "examples": [
      {
        "input": "a = '11', b = '1'",
        "output": "\"100\""
      },
      {
        "input": "a = '1010', b = '1011'",
        "output": "\"10101\""
      }
    ],
    "constraints": [
      "1 <= a.length, b.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "'11', '1'",
        "expectedOutput": "\"100\"",
        "isHidden": false
      },
      {
        "input": "'1010', '1011'",
        "expectedOutput": "\"10101\"",
        "isHidden": false
      },
      {
        "input": "'0', '0'",
        "expectedOutput": "\"0\"",
        "isHidden": true
      },
      {
        "input": "'1', '111'",
        "expectedOutput": "\"1000\"",
        "isHidden": true
      },
      {
        "input": "'100', '110010'",
        "expectedOutput": "\"110110\"",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(a: str, b: str) -> str:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "daily-temperatures",
    "title": "Daily Temperatures",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Stack",
      "Monotonic Stack"
    ],
    "description": "For each day, return how many days until a warmer temperature (0 if none).",
    "examples": [
      {
        "input": "temperatures = [73, 74, 75, 71, 69, 72, 76, 73]",
        "output": "[1, 1, 4, 2, 1, 1, 0, 0]"
      },
      {
        "input": "temperatures = [30, 40, 50, 60]",
        "output": "[1, 1, 1, 0]"
      }
    ],
    "constraints": [
      "1 <= temperatures.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "[73, 74, 75, 71, 69, 72, 76, 73]",
        "expectedOutput": "[1, 1, 4, 2, 1, 1, 0, 0]",
        "isHidden": false
      },
      {
        "input": "[30, 40, 50, 60]",
        "expectedOutput": "[1, 1, 1, 0]",
        "isHidden": false
      },
      {
        "input": "[30, 60, 90]",
        "expectedOutput": "[1, 1, 0]",
        "isHidden": true
      },
      {
        "input": "[90, 80, 70]",
        "expectedOutput": "[0, 0, 0]",
        "isHidden": true
      },
      {
        "input": "[50]",
        "expectedOutput": "[0]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(temperatures: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "combination-sum",
    "title": "Combination Sum",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Backtracking"
    ],
    "description": "Return all unique combinations of `candidates` (reusable) that sum to `target`. Each combination sorted ascending; list sorted.",
    "examples": [
      {
        "input": "candidates = [2, 3, 6, 7], target = 7",
        "output": "[[2, 2, 3], [7]]"
      },
      {
        "input": "candidates = [2, 3, 5], target = 8",
        "output": "[[2, 2, 2, 2], [2, 3, 3], [3, 5]]"
      }
    ],
    "constraints": [
      "1 <= candidates.length <= 30",
      "All elements distinct"
    ],
    "testCases": [
      {
        "input": "[2, 3, 6, 7], 7",
        "expectedOutput": "[[2, 2, 3], [7]]",
        "isHidden": false
      },
      {
        "input": "[2, 3, 5], 8",
        "expectedOutput": "[[2, 2, 2, 2], [2, 3, 3], [3, 5]]",
        "isHidden": false
      },
      {
        "input": "[2], 1",
        "expectedOutput": "[]",
        "isHidden": true
      },
      {
        "input": "[3, 5], 8",
        "expectedOutput": "[[3, 5]]",
        "isHidden": true
      },
      {
        "input": "[2, 4], 6",
        "expectedOutput": "[[2, 2, 2], [2, 4]]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(candidates: list, target: int) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "first-unique-character-in-a-string",
    "title": "First Unique Character in a String",
    "difficulty": "Easy",
    "tags": [
      "String",
      "Hash Table"
    ],
    "description": "Return the index of the first non-repeating character in `s`, or -1 if none.",
    "examples": [
      {
        "input": "s = 'leetcode'",
        "output": "0"
      },
      {
        "input": "s = 'loveleetcode'",
        "output": "2"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "'leetcode'",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "'loveleetcode'",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "'aabb'",
        "expectedOutput": "-1",
        "isHidden": true
      },
      {
        "input": "'z'",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "'abcabd'",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "length-of-last-word",
    "title": "Length of Last Word",
    "difficulty": "Easy",
    "tags": [
      "String"
    ],
    "description": "Return the length of the last word in `s` (a maximal substring of non-space characters).",
    "examples": [
      {
        "input": "s = 'Hello World'",
        "output": "5"
      },
      {
        "input": "s = '   fly me   to   the moon  '",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "'Hello World'",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "'   fly me   to   the moon  '",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "'luffy is still joyboy'",
        "expectedOutput": "6",
        "isHidden": true
      },
      {
        "input": "'a'",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "'word'",
        "expectedOutput": "4",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "plus-one",
    "title": "Plus One",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Math"
    ],
    "description": "Given a non-negative integer represented as an array of digits (most significant first), return the digits after adding one.",
    "examples": [
      {
        "input": "digits = [1, 2, 3]",
        "output": "[1, 2, 4]"
      },
      {
        "input": "digits = [4, 3, 2, 1]",
        "output": "[4, 3, 2, 2]"
      }
    ],
    "constraints": [
      "1 <= digits.length <= 100"
    ],
    "testCases": [
      {
        "input": "[1, 2, 3]",
        "expectedOutput": "[1, 2, 4]",
        "isHidden": false
      },
      {
        "input": "[4, 3, 2, 1]",
        "expectedOutput": "[4, 3, 2, 2]",
        "isHidden": false
      },
      {
        "input": "[9]",
        "expectedOutput": "[1, 0]",
        "isHidden": true
      },
      {
        "input": "[9, 9]",
        "expectedOutput": "[1, 0, 0]",
        "isHidden": true
      },
      {
        "input": "[1, 9, 9]",
        "expectedOutput": "[2, 0, 0]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(digits: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "remove-duplicates-from-sorted-array",
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Two Pointers"
    ],
    "description": "Given a sorted array `nums`, return the number of unique elements.",
    "examples": [
      {
        "input": "nums = [1, 1, 2]",
        "output": "2"
      },
      {
        "input": "nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]",
        "output": "5"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 3 * 10^4",
      "nums is sorted ascending"
    ],
    "testCases": [
      {
        "input": "[1, 1, 2]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]",
        "expectedOutput": "5",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[2, 2, 2]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[1, 2, 3]",
        "expectedOutput": "3",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "search-insert-position",
    "title": "Search Insert Position",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Binary Search"
    ],
    "description": "Given a sorted array and a `target`, return the index where it is, or where it would be inserted in order.",
    "examples": [
      {
        "input": "nums = [1, 3, 5, 6], target = 5",
        "output": "2"
      },
      {
        "input": "nums = [1, 3, 5, 6], target = 2",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "nums is sorted, distinct"
    ],
    "testCases": [
      {
        "input": "[1, 3, 5, 6], 5",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[1, 3, 5, 6], 2",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[1, 3, 5, 6], 7",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "input": "[1, 3, 5, 6], 0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[1], 1",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list, target: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "valid-perfect-square",
    "title": "Valid Perfect Square",
    "difficulty": "Easy",
    "tags": [
      "Math",
      "Binary Search"
    ],
    "description": "Return `true` if the positive integer `num` is a perfect square.",
    "examples": [
      {
        "input": "num = 16",
        "output": "True"
      },
      {
        "input": "num = 14",
        "output": "False"
      }
    ],
    "constraints": [
      "1 <= num <= 2^31 - 1"
    ],
    "testCases": [
      {
        "input": "16",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "14",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "2147395600",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "808201",
        "expectedOutput": "True",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(num: int) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "sqrtx",
    "title": "Sqrt(x)",
    "difficulty": "Easy",
    "tags": [
      "Math",
      "Binary Search"
    ],
    "description": "Return the integer square root of a non-negative integer `x` (truncated toward zero).",
    "examples": [
      {
        "input": "x = 4",
        "output": "2"
      },
      {
        "input": "x = 8",
        "output": "2"
      }
    ],
    "constraints": [
      "0 <= x <= 2^31 - 1"
    ],
    "testCases": [
      {
        "input": "4",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "8",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "1",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "2147395600",
        "expectedOutput": "46340",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(x: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "valid-parentheses",
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "tags": [
      "String",
      "Stack"
    ],
    "description": "Given a string of brackets `()[]{}`, return `true` if they are validly opened and closed.",
    "examples": [
      {
        "input": "s = '()'",
        "output": "True"
      },
      {
        "input": "s = '()[]{}'",
        "output": "True"
      }
    ],
    "constraints": [
      "1 <= s.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "'()'",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "'()[]{}'",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "'(]'",
        "expectedOutput": "False",
        "isHidden": true
      },
      {
        "input": "'([)]'",
        "expectedOutput": "False",
        "isHidden": true
      },
      {
        "input": "'{[]}'",
        "expectedOutput": "True",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "generate-parentheses",
    "title": "Generate Parentheses",
    "difficulty": "Medium",
    "tags": [
      "String",
      "Backtracking",
      "Dynamic Programming"
    ],
    "description": "Return all combinations of `n` well-formed parentheses pairs, sorted in ascending order.",
    "examples": [
      {
        "input": "n = 3",
        "output": "[\"((()))\", \"(()())\", \"(())()\", \"()(())\", \"()()()\"]"
      },
      {
        "input": "n = 1",
        "output": "[\"()\"]"
      }
    ],
    "constraints": [
      "1 <= n <= 8"
    ],
    "testCases": [
      {
        "input": "3",
        "expectedOutput": "[\"((()))\", \"(()())\", \"(())()\", \"()(())\", \"()()()\"]",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "[\"()\"]",
        "isHidden": false
      },
      {
        "input": "2",
        "expectedOutput": "[\"(())\", \"()()\"]",
        "isHidden": true
      },
      {
        "input": "4",
        "expectedOutput": "[\"(((())))\", \"((()()))\", \"((())())\", \"((()))()\", \"(()(()))\", \"(()()())\", \"(()())()\", \"(())(())\", \"(())()()\", \"()((()))\", \"()(()())\", \"()(())()\", \"()()(())\", \"()()()()\"]",
        "isHidden": true
      },
      {
        "input": "0",
        "expectedOutput": "[\"\"]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(n: int) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "majority-element",
    "title": "Majority Element",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Hash Table"
    ],
    "description": "Return the element that appears more than n/2 times (it always exists).",
    "examples": [
      {
        "input": "nums = [3, 2, 3]",
        "output": "3"
      },
      {
        "input": "nums = [2, 2, 1, 1, 1, 2, 2]",
        "output": "2"
      }
    ],
    "constraints": [
      "n == nums.length",
      "A majority element always exists"
    ],
    "testCases": [
      {
        "input": "[3, 2, 3]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[2, 2, 1, 1, 1, 2, 2]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[5, 5, 5, 1]",
        "expectedOutput": "5",
        "isHidden": true
      },
      {
        "input": "[9, 9, 9, 9, 1, 2]",
        "expectedOutput": "9",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "pascals-triangle",
    "title": "Pascal's Triangle",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "description": "Return the first `numRows` rows of Pascal's triangle.",
    "examples": [
      {
        "input": "numRows = 5",
        "output": "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]"
      },
      {
        "input": "numRows = 1",
        "output": "[[1]]"
      }
    ],
    "constraints": [
      "1 <= numRows <= 30"
    ],
    "testCases": [
      {
        "input": "5",
        "expectedOutput": "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "[[1]]",
        "isHidden": false
      },
      {
        "input": "2",
        "expectedOutput": "[[1], [1, 1]]",
        "isHidden": true
      },
      {
        "input": "3",
        "expectedOutput": "[[1], [1, 1], [1, 2, 1]]",
        "isHidden": true
      },
      {
        "input": "6",
        "expectedOutput": "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1]]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(numRows: int) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "spiral-matrix",
    "title": "Spiral Matrix",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Matrix",
      "Simulation"
    ],
    "description": "Return all elements of the matrix in spiral order (clockwise from the top-left).",
    "examples": [
      {
        "input": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "output": "[1, 2, 3, 6, 9, 8, 7, 4, 5]"
      },
      {
        "input": "matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]",
        "output": "[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]"
      }
    ],
    "constraints": [
      "1 <= rows, cols <= 10"
    ],
    "testCases": [
      {
        "input": "[[1, 2, 3], [4, 5, 6], [7, 8, 9]]",
        "expectedOutput": "[1, 2, 3, 6, 9, 8, 7, 4, 5]",
        "isHidden": false
      },
      {
        "input": "[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]",
        "expectedOutput": "[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]",
        "isHidden": false
      },
      {
        "input": "[[1]]",
        "expectedOutput": "[1]",
        "isHidden": true
      },
      {
        "input": "[[1, 2], [3, 4]]",
        "expectedOutput": "[1, 2, 4, 3]",
        "isHidden": true
      },
      {
        "input": "[[7], [9], [6]]",
        "expectedOutput": "[7, 9, 6]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(matrix: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "jump-game",
    "title": "Jump Game",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Greedy",
      "Dynamic Programming"
    ],
    "description": "Each value is the max jump length from that index. Return `true` if you can reach the last index.",
    "examples": [
      {
        "input": "nums = [2, 3, 1, 1, 4]",
        "output": "True"
      },
      {
        "input": "nums = [3, 2, 1, 0, 4]",
        "output": "False"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "[2, 3, 1, 1, 4]",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "[3, 2, 1, 0, 4]",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "[0]",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "[2, 0, 0]",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "[1, 0, 1]",
        "expectedOutput": "False",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "hand-of-straights",
    "title": "Hand of Straights",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Greedy",
      "Hash Table",
      "Sorting"
    ],
    "description": "Return `true` if the `hand` can be rearranged into groups of `groupSize` consecutive cards.",
    "examples": [
      {
        "input": "hand = [1, 2, 3, 6, 2, 3, 4, 7, 8], groupSize = 3",
        "output": "True"
      },
      {
        "input": "hand = [1, 2, 3, 4, 5], groupSize = 4",
        "output": "False"
      }
    ],
    "constraints": [
      "1 <= hand.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "[1, 2, 3, 6, 2, 3, 4, 7, 8], 3",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "[1, 2, 3, 4, 5], 4",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "[1, 1, 2, 2, 3, 3], 3",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "[8, 10, 12], 3",
        "expectedOutput": "False",
        "isHidden": true
      },
      {
        "input": "[1, 2, 3, 4], 1",
        "expectedOutput": "True",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(hand: list, groupSize: int) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "intersection-of-two-arrays",
    "title": "Intersection of Two Arrays",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Hash Table",
      "Sorting"
    ],
    "description": "Return the sorted array of unique values present in both `nums1` and `nums2`.",
    "examples": [
      {
        "input": "nums1 = [1, 2, 2, 1], nums2 = [2, 2]",
        "output": "[2]"
      },
      {
        "input": "nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]",
        "output": "[4, 9]"
      }
    ],
    "constraints": [
      "1 <= nums1.length, nums2.length <= 1000"
    ],
    "testCases": [
      {
        "input": "[1, 2, 2, 1], [2, 2]",
        "expectedOutput": "[2]",
        "isHidden": false
      },
      {
        "input": "[4, 9, 5], [9, 4, 9, 8, 4]",
        "expectedOutput": "[4, 9]",
        "isHidden": false
      },
      {
        "input": "[1, 2, 3], [4, 5]",
        "expectedOutput": "[]",
        "isHidden": true
      },
      {
        "input": "[1], [1]",
        "expectedOutput": "[1]",
        "isHidden": true
      },
      {
        "input": "[3, 1, 2], [2, 1]",
        "expectedOutput": "[1, 2]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums1: list, nums2: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "top-k-frequent-elements",
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Hash Table",
      "Heap"
    ],
    "description": "Return the `k` most frequent elements, sorted by frequency descending, ties broken by value ascending.",
    "examples": [
      {
        "input": "nums = [1, 1, 1, 2, 2, 3], k = 2",
        "output": "[1, 2]"
      },
      {
        "input": "nums = [1], k = 1",
        "output": "[1]"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "k is in the valid range"
    ],
    "testCases": [
      {
        "input": "[1, 1, 1, 2, 2, 3], 2",
        "expectedOutput": "[1, 2]",
        "isHidden": false
      },
      {
        "input": "[1], 1",
        "expectedOutput": "[1]",
        "isHidden": false
      },
      {
        "input": "[4, 4, 5, 5, 6], 2",
        "expectedOutput": "[4, 5]",
        "isHidden": true
      },
      {
        "input": "[1, 2, 3, 4], 2",
        "expectedOutput": "[1, 2]",
        "isHidden": true
      },
      {
        "input": "[7, 7, 7, 8, 8, 9], 3",
        "expectedOutput": "[7, 8, 9]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list, k: int) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "roman-to-integer",
    "title": "Roman to Integer",
    "difficulty": "Easy",
    "tags": [
      "Math",
      "String",
      "Hash Table"
    ],
    "description": "Convert a Roman numeral string to its integer value.",
    "examples": [
      {
        "input": "s = 'III'",
        "output": "3"
      },
      {
        "input": "s = 'LVIII'",
        "output": "58"
      }
    ],
    "constraints": [
      "1 <= s.length <= 15",
      "s is a valid Roman numeral in [1, 3999]"
    ],
    "testCases": [
      {
        "input": "'III'",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "'LVIII'",
        "expectedOutput": "58",
        "isHidden": false
      },
      {
        "input": "'MCMXCIV'",
        "expectedOutput": "1994",
        "isHidden": true
      },
      {
        "input": "'IV'",
        "expectedOutput": "4",
        "isHidden": true
      },
      {
        "input": "'IX'",
        "expectedOutput": "9",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "set-matrix-zeroes",
    "title": "Set Matrix Zeroes",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Matrix",
      "Hash Table"
    ],
    "description": "If an element is 0, set its entire row and column to 0. Return the resulting matrix.",
    "examples": [
      {
        "input": "matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]",
        "output": "[[1, 0, 1], [0, 0, 0], [1, 0, 1]]"
      },
      {
        "input": "matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]",
        "output": "[[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]"
      }
    ],
    "constraints": [
      "1 <= rows, cols <= 200"
    ],
    "testCases": [
      {
        "input": "[[1, 1, 1], [1, 0, 1], [1, 1, 1]]",
        "expectedOutput": "[[1, 0, 1], [0, 0, 0], [1, 0, 1]]",
        "isHidden": false
      },
      {
        "input": "[[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]",
        "expectedOutput": "[[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]",
        "isHidden": false
      },
      {
        "input": "[[1]]",
        "expectedOutput": "[[1]]",
        "isHidden": true
      },
      {
        "input": "[[1, 0], [1, 1]]",
        "expectedOutput": "[[0, 0], [1, 0]]",
        "isHidden": true
      },
      {
        "input": "[[5, 0, 5]]",
        "expectedOutput": "[[0, 0, 0]]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(matrix: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "missing-number",
    "title": "Missing Number",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Math",
      "Bit Manipulation"
    ],
    "description": "Given an array containing n distinct numbers from the range [0, n], return the one that is missing.",
    "examples": [
      {
        "input": "nums = [3, 0, 1]",
        "output": "2"
      },
      {
        "input": "nums = [0, 1]",
        "output": "2"
      }
    ],
    "constraints": [
      "n == nums.length",
      "0 <= nums[i] <= n"
    ],
    "testCases": [
      {
        "input": "[3, 0, 1]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[0, 1]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[9, 6, 4, 2, 3, 5, 7, 0, 1]",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "input": "[0]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[1]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "partition-labels",
    "title": "Partition Labels",
    "difficulty": "Medium",
    "tags": [
      "String",
      "Greedy",
      "Two Pointers"
    ],
    "description": "Partition `s` into as many parts as possible so each letter appears in at most one part. Return the part sizes in order.",
    "examples": [
      {
        "input": "s = 'ababcbacadefegdehijhklij'",
        "output": "[9, 7, 8]"
      },
      {
        "input": "s = 'eccbbbbdec'",
        "output": "[10]"
      }
    ],
    "constraints": [
      "1 <= s.length <= 500"
    ],
    "testCases": [
      {
        "input": "'ababcbacadefegdehijhklij'",
        "expectedOutput": "[9, 7, 8]",
        "isHidden": false
      },
      {
        "input": "'eccbbbbdec'",
        "expectedOutput": "[10]",
        "isHidden": false
      },
      {
        "input": "'a'",
        "expectedOutput": "[1]",
        "isHidden": true
      },
      {
        "input": "'abcabc'",
        "expectedOutput": "[6]",
        "isHidden": true
      },
      {
        "input": "'aaaa'",
        "expectedOutput": "[4]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "house-robber-ii",
    "title": "House Robber II",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "description": "Houses are in a circle, so the first and last are adjacent. Return the maximum you can rob without robbing adjacent houses.",
    "examples": [
      {
        "input": "nums = [2, 3, 2]",
        "output": "3"
      },
      {
        "input": "nums = [1, 2, 3, 1]",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100"
    ],
    "testCases": [
      {
        "input": "[2, 3, 2]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "[1, 2, 3, 1]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[1, 2, 3]",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "input": "[0]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[5, 1, 1, 5]",
        "expectedOutput": "6",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "valid-palindrome",
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "tags": [
      "String",
      "Two Pointers"
    ],
    "description": "Return `true` if `s` is a palindrome after lowercasing and removing all non-alphanumeric characters.",
    "examples": [
      {
        "input": "s = 'A man, a plan, a canal: Panama'",
        "output": "True"
      },
      {
        "input": "s = 'race a car'",
        "output": "False"
      }
    ],
    "constraints": [
      "1 <= s.length <= 2 * 10^5"
    ],
    "testCases": [
      {
        "input": "'A man, a plan, a canal: Panama'",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "'race a car'",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "' '",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "'ab_a'",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "'0P'",
        "expectedOutput": "False",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "group-anagrams",
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "String",
      "Hash Table",
      "Sorting"
    ],
    "description": "Group anagrams together. Return each group sorted ascending, and the list of groups sorted ascending.",
    "examples": [
      {
        "input": "strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']",
        "output": "[[\"ate\", \"eat\", \"tea\"], [\"bat\"], [\"nat\", \"tan\"]]"
      },
      {
        "input": "strs = ['']",
        "output": "[[\"\"]]"
      }
    ],
    "constraints": [
      "1 <= strs.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "['eat', 'tea', 'tan', 'ate', 'nat', 'bat']",
        "expectedOutput": "[[\"ate\", \"eat\", \"tea\"], [\"bat\"], [\"nat\", \"tan\"]]",
        "isHidden": false
      },
      {
        "input": "['']",
        "expectedOutput": "[[\"\"]]",
        "isHidden": false
      },
      {
        "input": "['a']",
        "expectedOutput": "[[\"a\"]]",
        "isHidden": true
      },
      {
        "input": "['abc', 'bca', 'xyz']",
        "expectedOutput": "[[\"abc\", \"bca\"], [\"xyz\"]]",
        "isHidden": true
      },
      {
        "input": "['ab', 'ba', 'abc']",
        "expectedOutput": "[[\"ab\", \"ba\"], [\"abc\"]]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(strs: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "fibonacci-number",
    "title": "Fibonacci Number",
    "difficulty": "Easy",
    "tags": [
      "Math",
      "Dynamic Programming"
    ],
    "description": "Return the n-th Fibonacci number, where F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2).",
    "examples": [
      {
        "input": "n = 2",
        "output": "1"
      },
      {
        "input": "n = 4",
        "output": "3"
      }
    ],
    "constraints": [
      "0 <= n <= 30"
    ],
    "testCases": [
      {
        "input": "2",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "4",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "10",
        "expectedOutput": "55",
        "isHidden": true
      },
      {
        "input": "20",
        "expectedOutput": "6765",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(n: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "number-of-1-bits",
    "title": "Number of 1 Bits",
    "difficulty": "Easy",
    "tags": [
      "Bit Manipulation"
    ],
    "description": "Return the number of set bits (1s) in the binary representation of `n`.",
    "examples": [
      {
        "input": "n = 11",
        "output": "3"
      },
      {
        "input": "n = 128",
        "output": "1"
      }
    ],
    "constraints": [
      "0 <= n <= 2^31 - 1"
    ],
    "testCases": [
      {
        "input": "11",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "128",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "255",
        "expectedOutput": "8",
        "isHidden": true
      },
      {
        "input": "2147483645",
        "expectedOutput": "30",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(n: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "single-number",
    "title": "Single Number",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Bit Manipulation"
    ],
    "description": "Every element appears twice except one. Return the element that appears once.",
    "examples": [
      {
        "input": "nums = [2, 2, 1]",
        "output": "1"
      },
      {
        "input": "nums = [4, 1, 2, 1, 2]",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 3 * 10^4"
    ],
    "testCases": [
      {
        "input": "[2, 2, 1]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[4, 1, 2, 1, 2]",
        "expectedOutput": "4",
        "isHidden": false
      },
      {
        "input": "[1]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[7, 3, 7]",
        "expectedOutput": "3",
        "isHidden": true
      },
      {
        "input": "[0, 0, 9]",
        "expectedOutput": "9",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "minimum-window-substring",
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "tags": [
      "String",
      "Sliding Window",
      "Hash Table"
    ],
    "description": "Return the smallest substring of `s` containing every character of `t` (with multiplicity), or an empty string.",
    "examples": [
      {
        "input": "s = 'ADOBECODEBANC', t = 'ABC'",
        "output": "\"BANC\""
      },
      {
        "input": "s = 'a', t = 'a'",
        "output": "\"a\""
      }
    ],
    "constraints": [
      "1 <= s.length, t.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "'ADOBECODEBANC', 'ABC'",
        "expectedOutput": "\"BANC\"",
        "isHidden": false
      },
      {
        "input": "'a', 'a'",
        "expectedOutput": "\"a\"",
        "isHidden": false
      },
      {
        "input": "'a', 'aa'",
        "expectedOutput": "\"\"",
        "isHidden": true
      },
      {
        "input": "'ab', 'b'",
        "expectedOutput": "\"b\"",
        "isHidden": true
      },
      {
        "input": "'cabwefgewcwaefgcf', 'cae'",
        "expectedOutput": "\"cwae\"",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str, t: str) -> str:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "partition-equal-subset-sum",
    "title": "Partition Equal Subset Sum",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "description": "Return `true` if `nums` can be split into two subsets with equal sum.",
    "examples": [
      {
        "input": "nums = [1, 5, 11, 5]",
        "output": "True"
      },
      {
        "input": "nums = [1, 2, 3, 5]",
        "output": "False"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 200"
    ],
    "testCases": [
      {
        "input": "[1, 5, 11, 5]",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "[1, 2, 3, 5]",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "[2, 2]",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "[1]",
        "expectedOutput": "False",
        "isHidden": true
      },
      {
        "input": "[3, 3, 3, 4, 5]",
        "expectedOutput": "True",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "power-of-two",
    "title": "Power of Two",
    "difficulty": "Easy",
    "tags": [
      "Math",
      "Bit Manipulation"
    ],
    "description": "Return `true` if `n` is a power of two.",
    "examples": [
      {
        "input": "n = 1",
        "output": "True"
      },
      {
        "input": "n = 16",
        "output": "True"
      }
    ],
    "constraints": [
      "-2^31 <= n <= 2^31 - 1"
    ],
    "testCases": [
      {
        "input": "1",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "16",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "3",
        "expectedOutput": "False",
        "isHidden": true
      },
      {
        "input": "0",
        "expectedOutput": "False",
        "isHidden": true
      },
      {
        "input": "1024",
        "expectedOutput": "True",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(n: int) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "car-fleet",
    "title": "Car Fleet",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Stack",
      "Sorting"
    ],
    "description": "Cars head to `target`; a slower car ahead caps faster cars behind it into one fleet. Return the number of fleets.",
    "examples": [
      {
        "input": "target = 12, position = [10, 8, 0, 5, 3], speed = [2, 4, 1, 1, 3]",
        "output": "3"
      },
      {
        "input": "target = 10, position = [3], speed = [3]",
        "output": "1"
      }
    ],
    "constraints": [
      "1 <= position.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]",
        "expectedOutput": "3",
        "isHidden": false
      },
      {
        "input": "10, [3], [3]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "100, [0, 2, 4], [4, 2, 1]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "10, [0, 4, 2], [2, 1, 3]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "10, [6, 8], [3, 2]",
        "expectedOutput": "2",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(target: int, position: list, speed: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "happy-number",
    "title": "Happy Number",
    "difficulty": "Easy",
    "tags": [
      "Math",
      "Hash Table"
    ],
    "description": "Repeatedly replace `n` with the sum of the squares of its digits. Return `true` if this reaches 1.",
    "examples": [
      {
        "input": "n = 19",
        "output": "True"
      },
      {
        "input": "n = 2",
        "output": "False"
      }
    ],
    "constraints": [
      "1 <= n <= 2^31 - 1"
    ],
    "testCases": [
      {
        "input": "19",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "2",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "1",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "7",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "116",
        "expectedOutput": "False",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(n: int) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "merge-two-sorted-arrays",
    "title": "Merge Two Sorted Arrays",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Sorting"
    ],
    "description": "Given two sorted arrays `a` and `b`, return a single sorted array containing all their elements.",
    "examples": [
      {
        "input": "a = [1, 3, 5], b = [2, 4, 6]",
        "output": "[1, 2, 3, 4, 5, 6]"
      },
      {
        "input": "a = [1, 2, 3], b = []",
        "output": "[1, 2, 3]"
      }
    ],
    "constraints": [
      "0 <= a.length, b.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "[1, 3, 5], [2, 4, 6]",
        "expectedOutput": "[1, 2, 3, 4, 5, 6]",
        "isHidden": false
      },
      {
        "input": "[1, 2, 3], []",
        "expectedOutput": "[1, 2, 3]",
        "isHidden": false
      },
      {
        "input": "[0], [0]",
        "expectedOutput": "[0, 0]",
        "isHidden": true
      },
      {
        "input": "[5, 6], [1, 2, 3]",
        "expectedOutput": "[1, 2, 3, 5, 6]",
        "isHidden": true
      },
      {
        "input": "[-1, 4], [-2, 3]",
        "expectedOutput": "[-2, -1, 3, 4]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(a: list, b: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "find-minimum-in-rotated-sorted-array",
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Binary Search"
    ],
    "description": "A sorted distinct array was rotated. Return its minimum element.",
    "examples": [
      {
        "input": "nums = [3, 4, 5, 1, 2]",
        "output": "1"
      },
      {
        "input": "nums = [4, 5, 6, 7, 0, 1, 2]",
        "output": "0"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5000",
      "All values distinct"
    ],
    "testCases": [
      {
        "input": "[3, 4, 5, 1, 2]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[4, 5, 6, 7, 0, 1, 2]",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "[11, 13, 15, 17]",
        "expectedOutput": "11",
        "isHidden": true
      },
      {
        "input": "[2, 1]",
        "expectedOutput": "1",
        "isHidden": true
      },
      {
        "input": "[1]",
        "expectedOutput": "1",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "container-with-most-water",
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Two Pointers",
      "Greedy"
    ],
    "description": "Each value is a vertical line height. Return the maximum water area between two lines.",
    "examples": [
      {
        "input": "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
        "output": "49"
      },
      {
        "input": "height = [1, 1]",
        "output": "1"
      }
    ],
    "constraints": [
      "2 <= height.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "[1, 8, 6, 2, 5, 4, 8, 3, 7]",
        "expectedOutput": "49",
        "isHidden": false
      },
      {
        "input": "[1, 1]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[4, 3, 2, 1, 4]",
        "expectedOutput": "16",
        "isHidden": true
      },
      {
        "input": "[1, 2, 1]",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "input": "[2, 3, 4, 5, 18, 17, 6]",
        "expectedOutput": "17",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(height: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "is-subsequence",
    "title": "Is Subsequence",
    "difficulty": "Easy",
    "tags": [
      "String",
      "Two Pointers"
    ],
    "description": "Return `true` if `s` is a subsequence of `t` (characters of `s` appear in order within `t`).",
    "examples": [
      {
        "input": "s = 'abc', t = 'ahbgdc'",
        "output": "True"
      },
      {
        "input": "s = 'axc', t = 'ahbgdc'",
        "output": "False"
      }
    ],
    "constraints": [
      "0 <= s.length <= 100",
      "0 <= t.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "'abc', 'ahbgdc'",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "'axc', 'ahbgdc'",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "'', 'abc'",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "'ace', 'abcde'",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "'aaa', 'aa'",
        "expectedOutput": "False",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(s: str, t: str) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "counting-bits",
    "title": "Counting Bits",
    "difficulty": "Easy",
    "tags": [
      "Dynamic Programming",
      "Bit Manipulation"
    ],
    "description": "Return an array `ans` of length n+1 where `ans[i]` is the number of 1 bits in `i`.",
    "examples": [
      {
        "input": "n = 2",
        "output": "[0, 1, 1]"
      },
      {
        "input": "n = 5",
        "output": "[0, 1, 1, 2, 1, 2]"
      }
    ],
    "constraints": [
      "0 <= n <= 10^5"
    ],
    "testCases": [
      {
        "input": "2",
        "expectedOutput": "[0, 1, 1]",
        "isHidden": false
      },
      {
        "input": "5",
        "expectedOutput": "[0, 1, 1, 2, 1, 2]",
        "isHidden": false
      },
      {
        "input": "0",
        "expectedOutput": "[0]",
        "isHidden": true
      },
      {
        "input": "1",
        "expectedOutput": "[0, 1]",
        "isHidden": true
      },
      {
        "input": "8",
        "expectedOutput": "[0, 1, 1, 2, 1, 2, 2, 3, 1]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(n: int) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "merge-intervals",
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Sorting",
      "Intervals"
    ],
    "description": "Merge all overlapping intervals and return them sorted by start.",
    "examples": [
      {
        "input": "intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]",
        "output": "[[1, 6], [8, 10], [15, 18]]"
      },
      {
        "input": "intervals = [[1, 4], [4, 5]]",
        "output": "[[1, 5]]"
      }
    ],
    "constraints": [
      "1 <= intervals.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "[[1, 3], [2, 6], [8, 10], [15, 18]]",
        "expectedOutput": "[[1, 6], [8, 10], [15, 18]]",
        "isHidden": false
      },
      {
        "input": "[[1, 4], [4, 5]]",
        "expectedOutput": "[[1, 5]]",
        "isHidden": false
      },
      {
        "input": "[[1, 4], [2, 3]]",
        "expectedOutput": "[[1, 4]]",
        "isHidden": true
      },
      {
        "input": "[[1, 4]]",
        "expectedOutput": "[[1, 4]]",
        "isHidden": true
      },
      {
        "input": "[[1, 4], [5, 6]]",
        "expectedOutput": "[[1, 4], [5, 6]]",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(intervals: list) -> list:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "maximum-product-subarray",
    "title": "Maximum Product Subarray",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "description": "Return the largest product of any contiguous non-empty subarray of `nums`.",
    "examples": [
      {
        "input": "nums = [2, 3, -2, 4]",
        "output": "6"
      },
      {
        "input": "nums = [-2, 0, -1]",
        "output": "0"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 2 * 10^4"
    ],
    "testCases": [
      {
        "input": "[2, 3, -2, 4]",
        "expectedOutput": "6",
        "isHidden": false
      },
      {
        "input": "[-2, 0, -1]",
        "expectedOutput": "0",
        "isHidden": false
      },
      {
        "input": "[-2, 3, -4]",
        "expectedOutput": "24",
        "isHidden": true
      },
      {
        "input": "[0, 2]",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "input": "[-3, -1, -1]",
        "expectedOutput": "3",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "contains-duplicate-ii",
    "title": "Contains Duplicate II",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Hash Table",
      "Sliding Window"
    ],
    "description": "Return `true` if there are two equal values at indices i, j with `abs(i - j) <= k`.",
    "examples": [
      {
        "input": "nums = [1, 2, 3, 1], k = 3",
        "output": "True"
      },
      {
        "input": "nums = [1, 0, 1, 1], k = 1",
        "output": "True"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5",
      "0 <= k <= 10^5"
    ],
    "testCases": [
      {
        "input": "[1, 2, 3, 1], 3",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "[1, 0, 1, 1], 1",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "[1, 2, 3, 1, 2, 3], 2",
        "expectedOutput": "False",
        "isHidden": true
      },
      {
        "input": "[99], 0",
        "expectedOutput": "False",
        "isHidden": true
      },
      {
        "input": "[1, 1], 1",
        "expectedOutput": "True",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(nums: list, k: int) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "non-overlapping-intervals",
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "tags": [
      "Array",
      "Greedy",
      "Sorting",
      "Intervals"
    ],
    "description": "Return the minimum number of intervals to remove so the rest are non-overlapping.",
    "examples": [
      {
        "input": "intervals = [[1, 2], [2, 3], [3, 4], [1, 3]]",
        "output": "1"
      },
      {
        "input": "intervals = [[1, 2], [1, 2], [1, 2]]",
        "output": "2"
      }
    ],
    "constraints": [
      "1 <= intervals.length <= 10^5"
    ],
    "testCases": [
      {
        "input": "[[1, 2], [2, 3], [3, 4], [1, 3]]",
        "expectedOutput": "1",
        "isHidden": false
      },
      {
        "input": "[[1, 2], [1, 2], [1, 2]]",
        "expectedOutput": "2",
        "isHidden": false
      },
      {
        "input": "[[1, 2], [2, 3]]",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "[[1, 100], [11, 22], [1, 11], [2, 12]]",
        "expectedOutput": "2",
        "isHidden": true
      },
      {
        "input": "[[1, 2]]",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(intervals: list) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "reverse-integer",
    "title": "Reverse Integer",
    "difficulty": "Easy",
    "tags": [
      "Math"
    ],
    "description": "Return `x` with its digits reversed. If the result overflows a signed 32-bit integer, return 0.",
    "examples": [
      {
        "input": "x = 123",
        "output": "321"
      },
      {
        "input": "x = -123",
        "output": "-321"
      }
    ],
    "constraints": [
      "-2^31 <= x <= 2^31 - 1"
    ],
    "testCases": [
      {
        "input": "123",
        "expectedOutput": "321",
        "isHidden": false
      },
      {
        "input": "-123",
        "expectedOutput": "-321",
        "isHidden": false
      },
      {
        "input": "120",
        "expectedOutput": "21",
        "isHidden": true
      },
      {
        "input": "0",
        "expectedOutput": "0",
        "isHidden": true
      },
      {
        "input": "1534236469",
        "expectedOutput": "0",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(x: int) -> int:\n    # Your code here\n    pass",
    "functionName": "solution"
  },
  {
    "slug": "meeting-rooms",
    "title": "Meeting Rooms",
    "difficulty": "Easy",
    "tags": [
      "Array",
      "Sorting",
      "Intervals"
    ],
    "description": "Given meeting time intervals, return `true` if a person can attend all meetings (no overlaps).",
    "examples": [
      {
        "input": "intervals = [[0, 30], [5, 10], [15, 20]]",
        "output": "False"
      },
      {
        "input": "intervals = [[7, 10], [2, 4]]",
        "output": "True"
      }
    ],
    "constraints": [
      "0 <= intervals.length <= 10^4"
    ],
    "testCases": [
      {
        "input": "[[0, 30], [5, 10], [15, 20]]",
        "expectedOutput": "False",
        "isHidden": false
      },
      {
        "input": "[[7, 10], [2, 4]]",
        "expectedOutput": "True",
        "isHidden": false
      },
      {
        "input": "[[1, 2], [2, 3]]",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "[[1, 5]]",
        "expectedOutput": "True",
        "isHidden": true
      },
      {
        "input": "[[1, 4], [2, 3]]",
        "expectedOutput": "False",
        "isHidden": true
      }
    ],
    "starterCode": "def solution(intervals: list) -> bool:\n    # Your code here\n    pass",
    "functionName": "solution"
  }
];
