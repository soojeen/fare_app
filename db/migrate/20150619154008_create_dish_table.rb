class CreateDishTable < ActiveRecord::Migration

  def change
    create_table :dishes do | t |
      t.belongs_to :restaurant
      t.string :name
      t.string :description
      t.float :price
      t.timestamps null: false
    end
  end

end
