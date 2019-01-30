class Api::TaggingsController < ApplicationController 

  def remove
    @tagging = Tagging.where(["tag_id = :tag_id and note_id = :note_id", { tag_id: params[:tagging][:tag_id], note_id: params[:tagging][:note_id] }]).first
    @tagging.destroy!
    @note = current_user.notes.find(params[:tagging][:note_id])
    @tags = @note.tags
    @notebook = @note.notebook
    render "api/notes/show"
  end

end