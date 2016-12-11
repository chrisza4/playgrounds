defmodule NumberTest do
  use ExUnit.Case
  doctest Number

  test "get" do
    number = Number.start()
    assert Number.get(number) === 0
  end

  test "Increment" do
    number = Number.start()
    assert Number.increment(number) === :ok
    assert Number.get(number) === 1
  end

  test "Decrement" do
    number = Number.start()
    assert Number.decrement(number) === :ok
    assert Number.get(number) === -1
  end

  test "Back and Forth" do
    number = Number.start()
    assert Number.increment(number) === :ok
    assert Number.decrement(number) === :ok
    assert Number.get(number) === 0
  end
end
