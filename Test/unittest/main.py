# Python functions - Exercises, Practice, Solution
# source: https://www.w3resource.com/python-exercises/python-functions-exercises.php
# Find the Max of three numbers
def max_of_two(x, y):
    if x > y:
        return x
    return y


def max_of_three(x, y, z):
    return max_of_two(x, max_of_two(y, z))


# Write a Python function to sum all the numbers in a list
def sum(numbers):
    total = 0
    for x in numbers:
        total += x
    return total


# Multiply all the numbers in a list
def multiply(numbers):
    total = 1
    for x in numbers:
        total *= x
    return total

#Write a Python program to reverse a string
def string_reverse(str1):
    rstr1 = ''
    index = len(str1)
    while index > 0:
        rstr1 += str1[ index - 1 ]
        index = index - 1
    return rstr1

#Unique elements from a list
def unique_list(l):
  x = []
  for a in l:
    if a not in x:
      x.append(a)
  return x