var DishLikes = React.createClass({
  handleSubmit: function (e) {
    e.prevent_default();

  },

  render: function () {
    return (
      <div className="dishLikes">
        <button className="submitLike btn-flat" type="submit">
          <i className="mdi-action-favorite-outline"></i>
        </button>
        <span>{this.props.likes_count}</span>
      </div>

    );
  }
});

var Dish = React.createClass({
  render: function () {
    return (
      <div className="row">
        <li className="dish col s12">
          <div className="dishName">{this.props.data.name}</div>
          <DishLikes likes_count={this.props.data.likes_count}/>
        </li>
      </div>
    );
  }
});

var DishList = React.createClass({
  render: function () {
    var DishNodes = this.props.data.map(function (dish) {
      return (
        <Dish data={dish} />
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
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function () {
    return {data: []};
  },

  componentDidMount: function () {
    this.loadDishesFromServer();
    setInterval(this.loadDishesFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div className="dishesBox">
        <h1 className="center-align">Fare</h1>
        <DishList data={this.state.data}/>
      </div>
    );
  }
});

React.render(
  <DishBox url={'/dishes'} pollInterval={100000}/>,
  document.getElementById('myDiv')
);