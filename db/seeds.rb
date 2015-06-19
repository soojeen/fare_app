r = Restaurant.create(name: Faker::Company.name)
u = User.create(username: Faker::Internet.user_name)

30.times do | i |
  dish_name = Faker::Lorem.words(2).join(' ')
  dish_desc = Faker::Lorem.words(20).join(' ')
  d = r.dishes.create(name: dish_name, description: dish_desc)
  
  random_num = Random.new
  random_num.rand(10).times do | j |
    Like.create(dish_id: d.id, user_id: u.id)
  end
end