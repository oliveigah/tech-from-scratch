defmodule TechFromScratch.Annotations do
  defstruct [:name, :thumbnail, :docs_link, :views]
  alias TechFromScratch.Annotations

  def list_annotations() do
    [
      %Annotations{
        name: "Elixir in Action",
        thumbnail: "/images/annotations/elixir-in-action.jpg",
        docs_link: "/annotations/elixir-in-action/index.html",
        views: 18
      },
      %Annotations{
        name: "Programming Phoenix",
        thumbnail: "/images/annotations/programming-phoenix.jpg",
        docs_link: "/annotations/programming-phoenix/index.html",
        views: 134
      }
    ]
  end

  def list_annotations(offset, amount) do
    list_annotations()
    |> Enum.slice(offset, amount)
  end
end
