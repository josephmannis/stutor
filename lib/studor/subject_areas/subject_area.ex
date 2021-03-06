defmodule Studor.SubjectAreas.SubjectArea do
  use Ecto.Schema
  import Ecto.Changeset


  schema "subject_areas" do
    field :subject_area, :string
    belongs_to :subject, Studor.Subjects.Subject

    timestamps()
  end

  @doc false
  def changeset(subject_area, attrs) do
    subject_area
    |> cast(attrs, [:subject_area])
    |> validate_required([:subject_area])
  end
end
