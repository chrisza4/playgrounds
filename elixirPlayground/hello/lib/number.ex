defmodule Number do

  def start do
    spawn fn -> process(0) end
  end

  def process(currentNumber) do
    receive do
      {:increment} -> process(currentNumber + 1)
      {:decrement} -> process(currentNumber - 1)
      {:get, caller} ->
        send(caller, {:result, currentNumber})
        process(currentNumber)
    end
  end

  def get(numberPid) do
    send(numberPid, {:get, self()})
    receive do
      {:result, currentNumber} -> currentNumber
    end
  end

  def increment(numberPid) do
    send(numberPid, {:increment})
    :ok
  end

  def decrement(numberPid) do
    send(numberPid, {:decrement})
    :ok
  end
end
