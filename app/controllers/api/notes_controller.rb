class Api::NotesController < ApplicationController 
  def index
    @notes = Note.all
    render "api/notes/index"
  end

  def show
    @note = current_user.notes.find(params[:id])
    render "api/notes/show"
  end

  def create
    @note = Note.new(note_params)
    @note.notebook = Notebook.all.first unless @note.notebook
    if @note.save
      render "api/notes/show"
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def destroy
    @note = current_user.notes.find(params[:id])
    @note.destroy
    render json: @note
  end

  def update
    @note = current_user.notes.find(params[:id])
    if @note.update(note_params)
      render "api/notes/show"
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :content, :notebook_id)
  end
end