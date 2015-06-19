# Homepage (Root path)
get '/' do
  erb :index
end

get '/dishes' do
  @dishes = Dish.order(created_at: :desc).limit(10)
  content_type :json
  @dishes.to_json
end
