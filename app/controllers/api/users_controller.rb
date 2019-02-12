class Api::UsersController < ApplicationController

  def check_email
    user_email = params[:user][:email].downcase;
    if User.find_by(email: user_email)
      render json: ["Valid Email"], status: 200
    else
      render json: ["There is no account for the email you entered."], status: 404
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @nb1 = Notebook.create!({title: 'General', user_id: @user.id})
      @n1 = Note.create!({title: 'My first note', content: "<p>Type here to add to your note's content!</p>", plain_text: "Type here to add to your note's content!", notebook_id: @nb1.id})
      @t1 = Tag.create!(name: "JustNote", user_id: @user.id)
      Tagging.create!(note_id: @n1.id, tag_id: @t1.id)
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end