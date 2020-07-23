class BandMember < ApplicationRecord
  belongs_to :band, optional: true
end
