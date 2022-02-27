import unittest

target = __import__("main")


class MyTestCase(unittest.TestCase):

    def test_max_of_three_0(self):
        result = target.max_of_three(0, -10, -5)
        self.assertEqual(result, 0)

    def test_max_of_three_25(self):
        result = target.max_of_three(-85, 25, -100)
        self.assertEqual(result, 25)

    def test_max_of_three_100(self):
        result = target.max_of_three(-85, 25, 100)
        self.assertEqual(result, 100)

    def test_sum_20(self):
        result = target.sum([-2, -8, 30, 0, 2, 4, -6])
        self.assertEqual(result, 20)

    def test_multiply_neg_336(self):
        result = target.multiply((8, 2, 3, -1, 7))
        self.assertEqual(result, -336)

    def test_string_reverse_dcba4321(self):
        result=target.string_reverse('1234abcd')
        self.assertEqual(result,'dcba4321')

    def test_unique_list_123(self):
        result=target.unique_list([1,3,3,1,2,2,1,3,2,3,2])
        self.assertEqual(result,list(set([1,3,3,1,2,2,1,3,2,3,2])))


if __name__ == '__main__':
    unittest.main()
