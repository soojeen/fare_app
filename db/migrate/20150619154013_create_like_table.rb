class CreateLikeTable < ActiveRecord::Migration

  def change
    create_table :likes do | t |
      t.belongs_to :dish
      t.belongs_to :user
      t.timestamps null: false
    end
  end

end
