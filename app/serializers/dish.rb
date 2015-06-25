class DishSerializer < ActiveModel::Serializer

  attributes :id, :likes_count, :description, :price, :name

  has_one :restaurant

end