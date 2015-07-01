enable :sessions

get '/' do
  erb :index
end

post '/likes' do
  Like.create(dish_id: params[:dish_id], user_id: session[:user_id])
  redirect '/dishes/user_likes'
end

delete '/likes' do
  like = Like.where(dish_id: params[:dish_id], user_id: session[:user_id])
  like[0].destroy
  redirect '/dishes/user_likes'
end

get '/dishes' do
  @dishes = Dish.includes(:restaurant).order(likes_count: :desc)
  json @dishes
end

get '/dishes/user_likes' do
  user_id = session[:user_id]
  @likes = (user_id) ? Like.where(user_id: user_id) : nil
  json @likes
end

get '/login' do
  username = params[:username]
  @user = User.find_by(username: username)
  @user = User.create(username: username) unless @user
  session[:user_id] = @user.id
  p session
  json @user
end

get '/logout' do
  session.clear
  @user = nil
  json @user
end

get '/sessions' do
  user_id = session[:user_id]
  @user = user_id ? User.find(session[:user_id]) : nil
  json @user
end
