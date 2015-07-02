class DishSerializer < ActiveModel::Serializer

  attributes :id, :likes_count, :description, :price, :name, :image_url

  has_one :restaurant

end