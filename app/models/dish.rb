class Dish < ActiveRecord::Base

  belongs_to :restaurant
  has_many :likes

  default_scope { select('id, restaurant_id, name, description, price, likes_count') }

end