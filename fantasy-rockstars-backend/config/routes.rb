Rails.application.routes.draw do
  resources :bands, only: [:index, :show, :create, :destroy]
  resources :band_members, only: [:index]
end
