class Band < ApplicationRecord
  belongs_to :guitarist,  -> { where(instrument: "guitar") }, class_name: "BandMember", foreign_key: :guitarist_id
  belongs_to :bassist, -> { where(instrument: "bass") }, class_name: "BandMember", foreign_key: :bassist_id
  belongs_to :drummer, -> { where(instrument: "drums") }, class_name: "BandMember", foreign_key: :drummer_id
  belongs_to :singer, -> { where(instrument: "microphone") }, class_name: "BandMember", foreign_key: :singer_id
  belongs_to :pianist, -> { where(instrument: "piano") }, class_name: "BandMember", foreign_key: :pianist_id

  validates :name, presence: true
  validates :name, uniqueness: true

  def total_band_skill
    bassist.skill_points + guitarist.skill_points + pianist.skill_points + drummer.skill_points + singer.skill_points
  end
end



# adjust fetc hto no longer create a band, and instead, just GET all of the band_members
# append band members to DOM in the appropriate dropdowns
