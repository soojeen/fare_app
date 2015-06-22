var Dish = React.createClass({
  render: function () {
    return (
      <li className="dish collection-item">
        <div className="dishName">{this.props.data.name}</div>
        <div className="dishLikes">{this.props.data.likes_count}</div>
      </li>
    );
  }
})

var DishList = React.createClass({
  render: function () {
    var DishNodes = this.props.data.map(function (dish) {
      return (
        <Dish data={dish} />
      );
    });
    return (
      <ul className="dishList collection">
        {DishNodes}
      </ul>
    );
  }
});

var DishBox = React.createClass({

  loadDishesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function () {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadDishesFromServer();
    setInterval(this.loadDishesFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div className="dishesBox">
        <h1>List</h1>
        <DishList data={this.state.data}/>
      </div>
    );
  }

});

React.render(
  <DishBox url={'/dishes'} pollInterval={2000}/>,
  document.getElementById('myDiv')
);