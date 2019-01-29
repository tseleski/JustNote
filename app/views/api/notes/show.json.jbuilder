json.note do
  json.extract! @note, :id, :title, :content, :plain_text, :updated_at, :created_at, :notebook_id
end

json.notebook do
  json.extract! @notebook, :id, :title
end
