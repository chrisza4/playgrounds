# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :phoenix_channel,
  ecto_repos: [PhoenixChannel.Repo]

# Configures the endpoint
config :phoenix_channel, PhoenixChannel.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "jmrw30nfUmHe+mpXI6/0idtGSnduRa5S0VoBrMEMIRjBxFhDuwL9dR4vAiauvw0v",
  render_errors: [view: PhoenixChannel.ErrorView, accepts: ~w(html json)],
  pubsub: [name: PhoenixChannel.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
