class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :body,     null: false
      t.string :image,    null: false
      t.integer :user_id, null: false, foreign_key: true
      t.integer :group_id,null: false, foreign_key: true
      t.timestamps
    end
  end
end
