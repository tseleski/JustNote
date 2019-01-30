class Api::TagsController < ApplicationController 
  def index
    @tags = current_user.tags
    render "api/tags/index"
  end

  def show
    @tag = current_user.tags.find(params[:id])
    render "api/tags/show"
  end

  def create
    @tag = current_user.tags.find_by(name: params[:name])
    unless @tag 
      @tag = current_user.tags.new(tag_params)
    end
    # create new tagging
    
    if @tag.save
      render "api/tags/show"
    else
      render json: @tag.errors.full_messages, status: 422
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