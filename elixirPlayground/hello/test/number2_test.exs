defmodule NumberTest2 do
  use ExUnit.Case
  doctest Number2

  test "get" do
    number = Number2.start()
    assert Number2.get(number) === 0
  end

  test "Increment" do
    number = Number2.start()
    assert Number2.increment(number) === :ok
    assert Number2.get(number) === 1
  end

  test "Decrement" do
    number = Number2.start()
    assert Number2.decrement(number) === :ok
    assert Number2.get(number) === -1
  end

  test "Back and Forth" do
    number = Number2.start()
    assert Number2.increment(number) === :ok
    assert Number2.decrement(number) === :ok
    assert Number2.get(number) === 0
  end

  test "push" do
    stack = Stack.start()
    assert Stack.push(stack, 1) == :ok
    assert Stack.pop(stack) == 1
  end

  test "pop nil" do
    stack = Stack.start()
    assert Stack.pop(stack) == nil
  end
end
