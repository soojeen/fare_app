enable :sessions

get '/' do
  erb :index
end

get '/dishes' do
  @dishes = Dish.includes(:restaurant).order(likes_count: :desc).limit(10)
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

get '/login' do
  username = params[:username]
  @user = User.find_by(username: username)
  session[:user_id] = @user.id
  redirect '/dishes'
end

post '/dishes' do
  dish_id = params[:dish_id]
  user_id = session[:user_id]
  @dish = Dish.find(dish_id.to_i)
  Like.create(dish_id: dish_id, user_id: user_id)
  redirect '/dishes'
end

get '/jdishes' do
  @dishes = Dish.includes(:restaurant).order(likes_count: :desc).limit(10)
  json @dishes
end

