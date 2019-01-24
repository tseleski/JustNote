class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :title, default: 'Untitled', null: false
      t.text :content, null: false
      t.integer :notebook_id, null: false, index: true
      t.timestamps
    end
  end
end
