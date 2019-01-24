@notes.each do |note|
  json.set! note.id do
    json.extract! note, :id, :title, :content, :updated_at, :created_at
  end
end
