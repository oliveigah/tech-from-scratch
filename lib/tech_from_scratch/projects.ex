defmodule TechFromScratch.Projects do
  defstruct [:name, :icon, :docs_link, :views, :description, :code_link]
  alias TechFromScratch.Projects

  def list_projects() do
    [
      %Projects{
        name: "Banking Prototype",
        icon: "fas fa-hand-holding-usd",
        code_link: "https://github.com/oliveigah/banking-prototype",
        views: 123,
        description: "System that manage financial accounts and currency transfers.",
        docs_link: "/projects/banking-prototype/index.html"
      },
      %Projects{
        name: "Distributed Logger",
        icon: "fas fa-share-alt-square",
        docs_link: "/projects/distributed-logger/index.html",
        views: 32,
        description: "System that handle log distribution among multiple servers.",
        code_link: "https://github.com/oliveigah/distributed-logger"
      },
      %Projects{
        name: "Tech From Scratch",
        icon: "fas fa-file-import",
        docs_link: "/",
        views: 221,
        description: "Personal blog written in elixir using phoenix framework",
        code_link: "https://github.com/oliveigah/tech-from-scratch"
      }
    ]
  end

  def list_projects(offset, amount) do
    list_projects()
    |> Enum.slice(offset, amount)
  end
end
