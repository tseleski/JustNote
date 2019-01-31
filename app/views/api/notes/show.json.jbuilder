json.note do
  json.extract! @note, :id, :title, :content, :plain_text, :updated_at, :created_at, :notebook_id, :tag_ids
end

json.notebook do
  json.extract! @notebook, :id, :title
end

json.tags do
  @tags.each do |tag|
    json.set! tag.id do
      json.extract! tag, :id, :name
    end
  end
end