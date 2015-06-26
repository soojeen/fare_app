enable :sessions

get '/' do
  erb :index
end

get '/dishes' do
  @dishes = Dish.includes(:restaurant).order(likes_count: :desc).limit(20)
  json @dishes
end

post '/dishes' do
  Like.create(dish_id: params[:dish_id], user_id: session[:user_id])
  redirect '/dishes/user_likes'
end

get '/dishes/user_likes' do
  @likes = nil
  @likes = Like.where(user_id: session[:user_id]) if session[:user_id]
  json @likes
end

get '/dishes/likes_count' do
  @dishes = Dish.all
  json @dishes
end

get '/login' do
  username = params[:username]
  @user = User.find_by(username: username)
  if !@user
    @user = User.create(username: username)
  end
  session[:user_id] = @user.id
  json @user
end

get '/logout' do
  session.clear
  @user = nil
  json @user
end

get '/sessions' do
  @user = nil
  @user = User.find(session[:user_id]) if session[:user_id]
  json @user
end
