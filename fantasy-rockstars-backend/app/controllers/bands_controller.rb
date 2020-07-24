class BandsController < ApplicationController
  def index
    bands = Band.all
    render json: bands.to_json(
      except: [:updated_at, :created_at]
    )
  end

  def create
    band = Band.new(band_params)
    if band.save
      render json: band.to_json(
        except: [:created_at, :updated_at]
      )
    else
      binding.pry
      render json: { error: "Band not created :(" }
    end
  end

private

  def band_params
    params.require(:band).permit(:name, :id)
  end
end
