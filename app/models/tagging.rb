class Tagging < ApplicationRecord
  validates :note_id, :tag_id, presence: true
  validates :note_id, uniqueness: { scope: :tag_id }

  belongs_to :note

  belongs_to :tag

  # def self.find_by_credentials(tag_id, note_id){
  #   Tag.where(["tag_id = :tag_id and note_id = :note_id", { tag_id: tag_id, note_id: note_id }])
  # end

end