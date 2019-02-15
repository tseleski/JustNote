class Note < ApplicationRecord
  validates :notebook_id, presence: true

  belongs_to :notebook

  has_one :user,
    through: :notebook,
    source: :user

  has_many :taggings, dependent: :destroy

  has_many :tags,
    through: :taggings,
    source: :tag
end