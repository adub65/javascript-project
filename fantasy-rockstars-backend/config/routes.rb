Rails.application.routes.draw do
  resources :bands, only: [:index, :create, :destroy]
  get "/bands/:name", to: "bands#show"
  resources :band_members, only: [:index]
end
