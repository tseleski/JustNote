class Notebook < ApplicationRecord
  validates :title, :user_id, presence: true
  validates :title, uniqueness: { scope: :user_id, 
    message: "is already in use"}

  belongs_to :user

  has_many :notes, dependent: :destroy

end