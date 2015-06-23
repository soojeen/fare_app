var DishLikes = React.createClass({

  handleClick: function (e) {
    console.log(this.props)
    this.props.onLike({dish_id: this.props.dish.id});
  },

  render: function () {
    return (
      <div className="dishLikes">
        <button className="submitLike btn-flat" onClick={this.handleClick}>
          <i className="mdi-action-favorite-outline"></i>
        </button>
        <span>{this.props.dish.likes_count}</span>
      </div>
    );
  }
});

var Dish = React.createClass({
  render: function () {
    return (
      <li className="dish">
        <div className="dishName">{this.props.dish.name}</div>
        <DishLikes dish={this.props.dish} onLike={this.props.onLike} />
      </li>
    );
  }
});

var DishList = React.createClass({
  render: function () {
    onLikeFunction = this.props.onLike;
    var DishNodes = this.props.dishes.map(function (dish) {
      return (
        <Dish dish={dish} onLike={onLikeFunction} />
      );
    });
    return (
      <ul className="dishList">
        {DishNodes}
      </ul>
    );
  }
});

var DishBox = React.createClass({
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

  handleLikeSubmit: function (dish) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: dish,
      success: function() {
        this.loadDishesFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)      
    })
  },

  getInitialState: function () {
    return {dishes: []};
  },

  componentDidMount: function () {
    this.loadDishesFromServer();
    setInterval(this.loadDishesFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div className="dishesBox">
        <h1 className="center-align">Fare</h1>
        <DishList dishes={this.state.dishes} onLike={this.handleLikeSubmit}/>
      </div>
    );
  }
});

React.render(
  <DishBox url={'/dishes'} pollInterval={100000}/>,
  document.getElementById('myDiv')
);