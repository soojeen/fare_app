var DishLikes = React.createClass ({

  handleClick: function (e) {
    this.props.onLike({dish_id: this.props.dish.id});
  },

  render: function () {
    var likeIcon = (this.props.liked) ? "mdi-action-favorite" : "mdi-action-favorite-outline";
    var likeClick = (this.props.liked) ? "" : this.handleClick;
    return (
      <span className="dishLikes">
        <a className="submitLike btn-flat" onClick={likeClick}>
          <i className={likeIcon}></i>
        </a>
        <span>{this.props.dish.likes_count}</span>
      </span>
    );
  }
});

var Dish = React.createClass ({
  render: function () {
    return (
      <li className="dish">
        <p className="dishName">{this.props.dish.name}</p>
        <p className="dishDescription truncate">{this.props.dish.description}</p>
        <div className="restaurantName">{this.props.dish.restaurant.name}
          <DishLikes dish={this.props.dish} liked={this.props.liked} onLike={this.props.onLike} />
        </div>
      </li>
    );
  }
});

var DishList = React.createClass ({
  render: function () {
    var onLike = this.props.onLike;
    var userLikes = this.props.userLikes;
    var DishNodes = this.props.dishes.map(function (dish) {
      var liked = false;
      var dish_hash = {dish_id: dish.id};
      if (_.find(userLikes, {dish_id: dish.id}) !== undefined)
        liked = true;
      return (
        <Dish dish={dish} liked={liked} onLike={onLike} key={dish.id}/>
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
  render: function () {
    return <a className="loginButton btn-flat left" onClick={this.props.onPress}>login</a>
  }
});

var LogoutButton = React.createClass ({
  render: function () {
    return <a className="logoutButton btn-flat right" onClick={this.props.onPress}>logout</a>
  }
});

var PageHeader = React.createClass ({
  render: function () {
    return (
      <header className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <h1 className="header center-align">Fare</h1>
          </div>
        </nav>
      </header>
    )
  }
});

var PageFooter = React.createClass ({
  render: function () {
    return (
      <footer className="pageFooter">
        <LoginButton onPress={this.props.login} />
        <LogoutButton onPress={this.props.logout} />
      </footer>
    )
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

  loadFromServer: function () {
    this.loadDishesFromServer();
    this.loadUserLikesFromServer();
  },

  handleLikeSubmit: function (dish) {
    var likes = this.state.userLikes;
    var newLikes = likes.concat([dish]);
    this.setState({userLikes: newLikes});
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
    });
  },

  getInitialState: function () {
    return {dishes: [], userLikes: []};
  },

  componentDidMount: function () {
    this.loadFromServer();
    setInterval(this.loadFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div className="dishesBox">
        <PageHeader />
        <DishList dishes={this.state.dishes} userLikes={this.state.userLikes} onLike={this.handleLikeSubmit} />
        <PageFooter login={this.loginToServer} logout={this.logoutOfServer} />
      </div>
    );
  }
});

React.render (
  <DishBox url={'/dishes'} pollInterval={10000} />,
  document.getElementById ('myDiv')
);
