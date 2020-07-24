class BandMembersController < ApplicationController
  def index
    band_members = BandMember.all
    render json: band_members.to_json()
  end
end