class DishSerializer < ActiveModel::Serializer

  attributes :id, :likes_count, :description, :price, :name

  # liked: true
  # restaurant: name

end