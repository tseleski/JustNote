class ChangeNotesTitleDefault < ActiveRecord::Migration[5.2]
  def change
    change_column_default :notes, :title, nil
    change_column_null :notes, :title, true
  end
end
