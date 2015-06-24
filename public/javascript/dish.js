var DishLikes = React.createClass ({

  handleClick: function (e) {
    this.props.onLike({dish_id: this.props.dish.id});
  },

  render: function () {
    return (
      <span className="dishLikes">
        <button className="submitLike btn-flat" onClick={this.handleClick}>
          <i className="mdi-action-favorite-outline"></i>
        </button>
        <span>{this.props.dish.likes_count}</span>
      </span>
    );
  }
});

var Dish = React.createClass ({
  render: function () {
    return (
      <li className="dish">
        <div className="dishName">{this.props.dish.name}</div>
        <div className="restaurantName">{this.props.dish.restaurant.name}
          <DishLikes dish={this.props.dish} onLike={this.props.onLike} />
        </div>
      </li>
    );
  }
});

var DishList = React.createClass ({
  render: function () {
    var onLikeFunction = this.props.onLike;
    var userLikes = this.props.userLikes;
    var DishNodes = this.props.dishes.map(function (dish) {
      var liked = false;
      var dish_hash = {dish_id: dish.id}
      if (_.find(userLikes, dish_hash) === undefined)
        {console.log('no instances');}
      else
        {console.log('found')}
      return (
        <Dish dish={dish} liked={liked} onLike={onLikeFunction} />
      );

    });
    return (
      <ul className="dishList">
        {DishNodes}
      </ul>
    );
  }
});

var LoginButton = React.createClass ({
  render: function() {
    console.log(this.props)
    return <a className="loginButton btn" onClick={this.props.onPress}>login</a>
  }
});

var LogoutButton = React.createClass ({
  render: function() {
    return <a className="logoutButton btn" onClick={this.props.onPress}>logout</a>
  }
});

var DishBox = React.createClass ({

  loginToServer: function () {
    $.ajax({
      url: '/login',
      dataType: 'json',
      cache: false,
      data: {username: 'foodie'},
      success: function (d) {
        this.setState({dishes: d});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  logoutOfServer: function () {
    $.ajax({
      url: '/logout',
      dataType: 'json',
      cache: false,
      success: function (d) {
        this.setState({dishes: d});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });    
  },

  loadDishesFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (d) {
        this.setState({dishes: d});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  loadUserLikesFromServer: function () {
    $.ajax({
      url: '/dishes/user_likes',
      dataType: 'json',
      cache: false,
      success: function (d) {
        this.setState({userLikes: d});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)      
    });
  },

  handleLikeSubmit: function (dish) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: dish,
      success: function (d) {
        this.setState({dishes: d});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)      
    })
  },

  getInitialState: function () {
    return {dishes: [], userLikes: []};
  },

  componentDidMount: function () {
    var loadDishes = this.loadDishesFromServer;
    var loadLikes = this.loadUserLikesFromServer;
    loadDishes();
    loadLikes();
    setInterval(function () {
      loadDishes();
      loadLikes();
    }, this.props.pollInterval);
  },

  render: function () {
    return (
      <div className="dishesBox">
        <LoginButton onPress={this.loginToServer} />
        <LogoutButton onPress={this.logoutOfServer} />
        <h1 className="center-align">Fare</h1>
        <DishList dishes={this.state.dishes} userLikes={this.state.userLikes} onLike={this.handleLikeSubmit} />
      </div>
    );
  }
});

React.render (
  <DishBox url={'/dishes'} pollInterval={5000} />,
  document.getElementById ('myDiv')
);