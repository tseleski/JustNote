class Api::NotesController < ApplicationController 
  def index
    @notes = current_user.notes
    render "api/notes/index"
  end

  def show
    @note = current_user.notes.find(params[:id])
    @notebook = @note.notebook
    @tags = @note.tags
    render "api/notes/show"
  end

  def create
    @note = Note.new(note_params)
    @note.notebook = current_user.notebooks.first unless @note.notebook
    @notebook = @note.notebook
    if @note.save
      if params[:note][:tag_id]
        Tagging.create!({ note_id: @note.id, tag_id: params[:note][:tag_id]})
      end
      @tags = @note.tags
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
      @notebook = @note.notebook
      @tags = @note.tags
      render "api/notes/show"
    else
      render json: @note.errors.full_messages, status: 422
    end
  end

  def search
    @query = params[:query]
    @notes = current_user.notes.select do |note|
      title = note.title.downcase
      plain_text = note.plain_text.downcase
      (title.include?(@query) || plain_text.include?(@query))
    end

    render "api/notes/index"
  end

  private

  def note_params
    params.require(:note).permit(:title, :content, :plain_text, :notebook_id)
  end
end