defmodule Studor.Repo.Migrations.CreateUniversities do
  use Ecto.Migration

  def change do
    create table(:universities) do
      add :name, :string, null: false

      timestamps()
    end

  end
end
