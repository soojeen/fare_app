class CreateDishTable < ActiveRecord::Migration

  def change
    create_table :dishes do | t |
      t.belongs_to :restaurant
      t.string :name
      t.string :description
      t.float :price
      t.integer :likes_count, default: 0
      t.timestamps null: false
    end
  end

end
