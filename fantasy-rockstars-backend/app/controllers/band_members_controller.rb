

class BandMembersController < ApplicationController
  def index
    band_members = BandMember.all
    render json: band_members.to_json(
      except: [:skill_points, :created_at, :updated_at, :band_id]
    )
  end
end