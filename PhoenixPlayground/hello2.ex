defmodule Test do
  def hey do
    cond do
      2 + 2 === 5 -> "NO"
      2 * 2 === 4 -> "YES"
    end
  end

  def factorial(0) do 1 end
  def factorial(1) do 1 end
  def factorial(n) do n * factorial(n-1) end

  def head ([ h| _]) do h end

  def doubleList([ ]),        do: [ ]
  def doubleList([ h | t ]),  do: [ h * 2 | doubleList(t) ]
  def testDoubleList do
    Test.doubleList [1,2,3] === [2,4,6]
  end

  def reverse([]),        do: [ ]
  def reverse([ h | t ]), do: reverse(t) ++ [ h ]
  def testRList do
    reverse [1, 2, 3] === [3, 2, 1]
  end

  def   sum(n),               do: sum(n, 0)
  defp  sum([], acc),         do: acc
  defp  sum([ h | t ], acc),  do: sum(t, acc + h)
  def testSum do
    Test.sum([ 1, 3, 5]) === 9
  end

  def map([ ], function),        do: [ ]
  def map([ h | t ], function),  do: [ function.(h) | map(t, function) ]
  def testMap,                   do: map([1,2,4,5], fn x -> x * 2 end) === [2, 4, 8, 10]

  def myReduce([], acc, function),        do: acc
  def myReduce([ h | t ], acc, function), do: myReduce(t, function.(h, acc), function)
  def testReduce, do: myReduce([1,2,3], 0, fn(x, acc) -> x+acc end ) === 6

  def process() do
    receive do
      msg -> IO.puts(msg)
    end
  end
end
