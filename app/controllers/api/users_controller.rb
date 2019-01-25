class Api::UsersController < ApplicationController

  def check_email
    user_email = params[:user][:email].downcase
    if User.find_by(email: user_email)
      render json: ["Valid Email"], status: 200
    else
      render json: ["There is no account for the email you entered."], status: 404
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      # render json: @user
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