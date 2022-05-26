class Card < ApplicationRecord
  belongs_to :card, optional: true
  has_many :cards
end
