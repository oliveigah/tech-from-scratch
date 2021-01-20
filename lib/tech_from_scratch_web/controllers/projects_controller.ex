defmodule TechFromScratchWeb.ProjectsController do
  use TechFromScratchWeb, :controller

  def get_layout_params() do
    [
      header_image: "/images/projects-bg.jpg",
      header_title: "Projects",
      header_subtitle: "theory |> practice( )"
    ]
  end

  def index(conn, _params) do
    projects = TechFromScratch.Projects.list_projects()
    params = [projects: projects] ++ get_layout_params()
    render(conn, "index.html", params)
  end
end
