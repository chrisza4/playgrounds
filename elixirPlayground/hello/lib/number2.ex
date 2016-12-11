defmodule Number2 do

  def start do
    {:ok, pid} = Agent.start(fn -> 0 end)
    pid
  end

  def get(numberPid) do
    Agent.get(numberPid, fn n -> n end)
  end

  def increment(numberPid) do
    Agent.update(numberPid, fn n -> n + 1 end)
  end

  def decrement(numberPid) do
    Agent.update(numberPid, fn n -> n - 1 end)
  end
end
