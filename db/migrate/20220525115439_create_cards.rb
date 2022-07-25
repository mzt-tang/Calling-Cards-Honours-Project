class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards, id: :string do |t|
      t.integer :position_x, null: false
      t.integer :position_y, null: false
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
