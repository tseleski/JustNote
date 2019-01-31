json.notes do 
    @notes.each do |note|
        json.set! note.id do
            json.extract! note, :id, :title, :content, :updated_at, :created_at, :plain_text, :notebook_id, :tag_ids
        end
    end
end
json.notebook do
    json.extract! @notebook, :id, :title
end