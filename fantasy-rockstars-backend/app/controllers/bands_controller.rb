class BandsController < ApplicationController
  def index
    bands = Band.all
    render json: bands.to_json()
  end

  def show
    band = Band.find_by(name: params[:id]) # a little confusing
    render json: fantasy_band(band)
  end

  def create
    band = Band.new(band_params)
    if band.save
      render json: fantasy_band(band)
    else
      render json: { error: "Band not created :(" }
    end
  end

  def destroy
    band = Band.find(params[:id])
    band.destroy
    render json: band.to_json()
  end

private

  def band_params
    params.require(:band).permit(:name, :guitarist_id, :bassist_id, :pianist_id, :singer_id, :drummer_id)
  end

  def fantasy_band(band)
    band.to_json(
      methods: :total_band_skill,
      only: [:id, :name, :total_band_skill],
      include: {
        guitarist: {
          only: [:name, :original_band]
        },
        bassist: {
          only: [:name, :original_band]
        },
        drummer: {
          only: [:name, :original_band]
        },
        singer: {
          only: [:name, :original_band]
        },
        pianist: {
          only: [:name, :original_band]
        }
      }
    )
  end
end
