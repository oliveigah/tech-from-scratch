defmodule TechFromScratchWeb.AnnotationsController do
  use TechFromScratchWeb, :controller

  def get_layout_params() do
    [
      header_image: "/images/annotations-bg.jpg",
      header_title: "Annotations",
      header_subtitle: "while (true) do: learn( )"
    ]
  end

  def index(conn, _params) do
    annotations = TechFromScratch.Annotations.list_annotations()
    params = [annotations: annotations] ++ get_layout_params()
    render(conn, "index.html", params)
  end
end
