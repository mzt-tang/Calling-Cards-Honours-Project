class Card < ApplicationRecord
  validates :position_x, presence: true
  validates :position_y, presence: true

  belongs_to :card, optional: true
  has_many :cards
end
