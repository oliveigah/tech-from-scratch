defmodule TechFromScratchWeb.HomeController do
  use TechFromScratchWeb, :controller

  def get_layout_params() do
    [
      header_image: "/images/home-bg.jpg",
      header_title: "Tech From Scratch",
      header_subtitle: "A personal journey: from concept to practice"
    ]
  end

  def index(conn, _params) do
    render(conn, "index.html", get_layout_params())
  end
end
