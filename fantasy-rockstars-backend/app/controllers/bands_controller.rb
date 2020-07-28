class BandsController < ApplicationController
  def index
    bands = Band.all
    render json: bands.to_json()
  end

  def create
    band = Band.new(band_params)
    if band.save
      render json: fantasy_band(band)
    else
      render json: { error: "Band not created :(" }
    end
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
          only: [:name]
        },
        bassist: {
          only: [:name]
        },
        drummer: {
          only: [:name]
        },
        singer: {
          only: [:name]
        },
        pianist: {
          only: [:name]
        }
      }
    )
  end
end
