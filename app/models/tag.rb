class Tag < ApplicationRecord
  validates :name, :user_id, presence: true
  validates :name, uniqueness: { scope: :user_id }

  has_many :taggings, dependent: :destroy

  belongs_to :user

  has_many :notes,
    through: :taggings,
    source: :note
end