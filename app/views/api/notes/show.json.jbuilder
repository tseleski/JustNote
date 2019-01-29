json.note do
  json.extract! @note, :id, :title, :content, :updated_at, :created_at, :notebook_id
end

json.notebook do
  json.extract! @notebook, :id, :title
end