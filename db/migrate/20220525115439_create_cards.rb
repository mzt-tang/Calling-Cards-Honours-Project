class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards, id: :string do |t|
      t.integer :position_x
      t.integer :position_y
      t.references :user, null: true, foreign_key: true

      t.timestamps
    end
  end
end
