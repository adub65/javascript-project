class BandsController < ApplicationController
  def index
    bands = Band.all
    render json: bands.to_json(
      except: [:updated_at, :created_at]
    )
  end
end
