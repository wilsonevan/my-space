class Api::V1::UsersController < ApplicationController
	# before_action :authenticate_user!
  before_action :set_user, only: [:show, :add_friend, :remove_friend]

  def index
    render json: User.all
  end

  def show
    render json: @user
  end

  # def update

  # end

  # def my_friends
  #   # binding.pry
  #   render json: current_user.friends_list
  # end

  def add_friend

    current_user.friends_list.push(define_friend)
    # binding.pry
    if current_user.save
      render json: current_user 
    else
      render json: @user.errors, status: 422
    end

  end

  def remove_friend

    new_list = current_user.friends_list.delete_if{|friend| friend == define_friend }
    # binding.pry
      
    current_user.friends_list = new_list
    # binding.pry
    if current_user.save
      render json: current_user 
    else
      render json: current_user.errors, status: 422
    end

  end

  # def create
  #   user = User.new(user_params)

  #   if user.save
  #     render json: user
  #   else
  #     render json: user.errors, status: 422
  #   end
  # end

  # def update
  #   if @user.update(user_params)
  #     render json: @user
  #   else
  #     render json: @user.errors, status: 422
  #   end
  # end

  # def destroy
  #   @user.destroy
  # end

  private
    def set_user
      # binding.pry
      @user = User.find(params[:id])
    end

    def define_friend
      # binding.pry
      params[:friendId].to_s
    end

    def user_params
      params.require(:user).permit(:name, :email, :nickname, :image, :tokens, :friends_list,)
    end   
end
