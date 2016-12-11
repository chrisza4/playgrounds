defmodule StackTest do
  use ExUnit.Case
  doctest Stack

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
