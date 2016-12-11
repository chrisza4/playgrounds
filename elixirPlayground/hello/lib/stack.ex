defmodule Stack do
  def start do
    spawn(fn ->
      process([ ])
    end)
  end

  def process(acc) do
    receive do
      {:push, n} -> process([ n | acc ])
      {:pop, sender} ->
        case acc do
          [ n | tail ] ->
            [ value | tail ] = acc
            send(sender, {:pop_recieved, value})
            process(tail)
          _ ->
          send(sender, { :pop_recieved, nil })
          process(acc)
        end
    end
  end

  def push(pid, n) do
    send(pid, {:push, n })
    :ok
  end

  def pop(pid) do
    send(pid, {:pop, self()})
    receive do
      {:pop_recieved, n} -> n
    end
  end
end
