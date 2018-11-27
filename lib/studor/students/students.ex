defmodule Studor.Students do
  @moduledoc """
  The Students context.
  """

  import Ecto.Query, warn: false
  alias Studor.Repo

  alias Studor.Students.Student

  @doc """
  Returns the list of students.

  ## Examples

      iex> list_students()
      [%Student{}, ...]

  """
  def list_students do
    Repo.all(Student)
  end

  @doc """
  Gets a single student.

  Raises `Ecto.NoResultsError` if the Student does not exist.

  ## Examples

      iex> get_student!(123)
      %Student{}

      iex> get_student!(456)
      ** (Ecto.NoResultsError)

  """
  def get_student!(id), do: Repo.get!(Student, id)

  @doc """
  Creates a student.

  ## Examples

      iex> create_student(%{field: value})
      {:ok, %Student{}}

      iex> create_student(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_student(attrs \\ %{}) do
    attrs = Map.put(attrs, "password_hash", Argon2.hash_pwd_salt(attrs["password_hash"]))

    %Student{}
    |> Student.changeset(attrs)
    |> Repo.insert()
  end


  @doc """
  Updates a student.

  ## Examples

      iex> update_student(student, %{field: new_value})
      {:ok, %Student{}}

      iex> update_student(student, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_student(%Student{} = student, attrs) do
    student
    |> Student.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Student.

  ## Examples

      iex> delete_student(student)
      {:ok, %Student{}}

      iex> delete_student(student)
      {:error, %Ecto.Changeset{}}

  """
  def delete_student(%Student{} = student) do
    Repo.delete(student)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking student changes.

  ## Examples

      iex> change_student(student)
      %Ecto.Changeset{source: %Student{}}

  """
  def change_student(%Student{} = student) do
    Student.changeset(student, %{})
  end

  def get_user_by_email(email) do
    Repo.get_by(Student, email: email)
  end

  def get_and_auth_user(email, password) do
    if password == '' do nil else
      user = get_user_by_email(email)

      if user == nil do nil else
      case Comeonin.Argon2.check_pass(user, password) do
        {:ok, user} -> user
        _else       -> nil
      end
    end
    end
  end

end
