class Api::SessionsController < ApplicationController

  def create
    user_email = params[:user][:email].downcase
    @user = User.find_by_credentials(
      user_email,
      params[:user][:password]
    )

    if @user
      login(@user)
      render "api/users/show"
    else
      render json: ["Invalid email or password"], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render "api/users/show"
    else
      render json: ["There is nobody signed in"], status: 404
    end
  end
end