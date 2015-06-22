# Homepage (Root path)
get '/' do
  erb :index
end

get '/dishes' do
  @dishes = Dish.order(likes_count: :desc).limit(10)
  content_type :json
  @dishes.to_json
end
