defmodule TechFromScratchWeb.PageController do
  use TechFromScratchWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
