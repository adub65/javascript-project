class BandMembersController < ApplicationController
  def index
    band_members = BandMember.all.group_by(&:instrument)
    render json: band_members.to_json(
      except: [:skill_points, :instrument]
    )
  end
end