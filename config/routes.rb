Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy, :show]
    resources :users, only: [:create]
    resources :notes, only: [:index, :create, :update, :destroy, :show]
    resources :notebooks, only: [:index, :create, :update, :destroy, :show]
    resources :tags, only: [:index, :create, :destroy, :show]
    resources :taggings, only: [:destroy]
    get 'users/emails', to: 'users#check_email'
    get 'taggings/remove', to: 'taggings#remove'
    get 'search', to: 'notes#search'
  end
end
