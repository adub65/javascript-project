class Band < ApplicationRecord
  has_many :band_members
  validates :name, presence: true
  validates :name, uniqueness: true
end
