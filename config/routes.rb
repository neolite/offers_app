Rails.application.routes.draw do
  resources :offers
  get 'hello_world', to: 'hello_world#index'
  root 'offers#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
