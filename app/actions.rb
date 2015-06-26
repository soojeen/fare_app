enable :sessions

get '/' do
  erb :index
end

get '/dishes' do
  @dishes = Dish.includes(:restaurant).order(likes_count: :desc).limit(20)
  json @dishes
end

get '/dishes/user_likes' do
  user_id = session[:user_id]
  @likes = (user_id) ? Like.where(user_id: user_id) : nil
  json @likes
end

get '/login' do
  username = params[:username]
  if @user = User.find_by(username: username)
    session[:user_id] = @user.id
  else
    @user = User.create(username: username)
  end
  json @user
end

get '/logout' do
  session.clear
  @user = nil
  json @user
end

get '/sessions' do
  if params[:username]
    @user = User.find_by(username: username)
  else
    @user = nil
  end
  json @user
end

post '/dishes' do
  dish_id = params[:dish_id]
  user_id = session[:user_id]
  @dish = Dish.find(dish_id.to_i)
  Like.create(dish_id: dish_id, user_id: user_id)
  redirect '/dishes'
end
