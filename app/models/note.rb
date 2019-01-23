class Note < ApplicationRecord
  validates :title, :content, :notebook_id, presence: true

  belongs_to :notebook

  has_one :user,
    through: :notebook,
    source: :user
end