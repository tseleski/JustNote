class Api::TagsController < ApplicationController 
  def index
    @tags = current_user.tags
    render "api/tags/index"
  end

  def show
    @tag = current_user.tags.find(params[:id])
    @notes = @tag.notes
    render "api/tags/show"
  end

  def create
    @tag = current_user.tags.find_by(name: params[:tag][:name])
    noteId = params[:tag][:note_id].to_i
    if @tag 
      @newTagging = Tagging.new({ note_id: noteId, tag_id: @tag.id })
    else
      @tag = current_user.tags.new(tag_params)
      @tag.save
      @newTagging = Tagging.new({ note_id: noteId, tag_id: @tag.id })
    end
    if @newTagging.save
      @notes = @tag.notes
      render "api/tags/show"
    else
      if @tag.name == "" 
        render json: ['Tag name cannot be blank'], status: 422
      else
        render json: ['This note already has that tag'], status: 422
      end
    end 
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
    render json: @tag
  end


  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end