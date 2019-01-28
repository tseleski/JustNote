class Api::NotebooksController < ApplicationController 
  def index
    @notebooks = current_user.notebooks
    render "api/notebooks/index"
  end

  def show
    @notebook = current_user.notebooks.find(params[:id])
    render "api/notebooks/show"
  end

  def create
    @notebook = Notebook.new(notebook_params)
    @notebook.user = current_user
    if @notebook.save
      render "api/notebooks/show"
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  def destroy
    @notebook = current_user.notebooks.find(params[:id])
    @notebook.destroy
    render "api/notebooks/show"
  end

  def update
    @notebook = current_user.notebooks.find(params[:id])
    if @notebook.update(notebook_params)
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