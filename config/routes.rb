Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :posts
      resources :users, only: [:index, :show]

      get 'my_friends', to: 'users#my_friends'
      post 'add_friend', to: 'users#add_friend'
    end
  end

end