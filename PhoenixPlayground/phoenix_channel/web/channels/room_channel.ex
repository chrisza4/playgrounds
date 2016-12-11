defmodule PhoenixChannel.RoomChannel do
  require Logger
  use Phoenix.Channel

  def join("room:lobby", msg, socket) do
    socket = assign(socket, :user, msg["token"])
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    IO.puts socket.assigns.user
    broadcast! socket, "new_msg", %{body: body}
    {:noreply, socket}
  end

  def handle_out("new_msg", payload, socket) do
    Logger.debug "NEW MESSAGE GO"
    IO.puts "NEW MESSAGE"
    Logger.debug(payload)
    push socket, "new_msg", payload
    {:noreply, socket}
  end

end
