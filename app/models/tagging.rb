class Tagging < ApplicationRecord
  validates :note_id, :tag_id, presence: true
  validates :note_id, uniqueness: { scope: :tag_id }

  belongs_to :note

  belongs_to :tag

end