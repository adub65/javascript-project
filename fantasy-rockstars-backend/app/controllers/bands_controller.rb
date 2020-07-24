class BandsController < ApplicationController
  def index
    bands = Band.all
    render json: bands.to_json()
  end

  # def create
  #   band = Band.new(band_params)
  #   if band.save
  #     render json: band.to_json()
  #   else
  #     render json: { error: "Band not created :(" }
  #   end
  # end

private

  def band_params
    params.require(:band).permit(:name, :id)
  end
end
