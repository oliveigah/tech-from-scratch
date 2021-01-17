defmodule TechFromScratch.Repo do
  use Ecto.Repo,
    otp_app: :tech_from_scratch,
    adapter: Ecto.Adapters.Postgres
end
