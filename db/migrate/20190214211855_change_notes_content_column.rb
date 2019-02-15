class ChangeNotesContentColumn < ActiveRecord::Migration[5.2]
  def change
    change_column_null :notes, :content, true
  end
end
