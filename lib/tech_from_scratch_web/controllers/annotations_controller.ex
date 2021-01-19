defmodule TechFromScratchWeb.AnnotationsController do
  use TechFromScratchWeb, :controller

  def index(conn, _params) do
    annotations = TechFromScratch.Annotations.list_annotations()
    render(conn, "index.html", annotations: annotations)
  end
end
