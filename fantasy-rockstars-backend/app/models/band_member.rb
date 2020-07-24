class BandMember < ApplicationRecord
  has_many :bands

  scope :guitarists, -> { where(instrument: "guitar") }
  scope :bassists, -> { where(instrument: "bass") }
  scope :drummers, -> { where(instrument: "drums") }
  scope :singers, -> { where(instrument: "microphone") }
  scope :pianists, -> { where(instrument: "piano") }
end
