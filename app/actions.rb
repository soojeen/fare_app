# Homepage (Root path)
get '/' do
  erb :index
end

get '/dishes' do
  @dishes = Dish.order(likes_count: :desc).limit(10)
  results = @dishes.map do |d|
    {
      id: d.id,
      liked: true, # condition,
      likes_count: d.likes_count,
      desc: d.description,
      price: d.price,
      name: d.name,
      restaurant: {
        name: d.restaurant.name
      }
    }
  end
  json results
end

post '/dishes' do
  dish_id = params['dish_id']
  @dish = Dish.find(dish_id.to_i)
  @dish.likes.create
  redirect '/dishes'
end