class Api::NotebooksController < ApplicationController 
  def index
    @notebooks = current_user.notebooks
    render "api/notebooks/index"
  end

  def show
    @notebook = current_user.notebooks.find(params[:id])
    @notes = @notebook.notes
    render "api/notebooks/show"
  end

  def create
    @notebook = Notebook.new(notebook_params)
    @notebook.user = current_user
    if @notebook.save
      @notes = @notebook.notes
      render "api/notebooks/show"
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  def destroy
    @notebook = current_user.notebooks.find(params[:id])
    if current_user.notebooks.length == 1
      render json: ['You must have at least one notebook'], status: 422
    else
      @notebook.destroy
      @notes = @notebook.notes
      render "api/notebooks/show"
    end
  end

  def update
    @notebook = current_user.notebooks.find(params[:id])
    if @notebook.update(notebook_params)
      @notes = @notebook.notes
      render "api/notebooks/show"
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  private

  def notebook_params
    params.require(:notebook).permit(:title)
  end
end