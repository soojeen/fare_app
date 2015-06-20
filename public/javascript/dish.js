var dish_data = [
  {name: 'Dish One', likes_count: '4'},
  {name: 'Dish Two', likes_count: '5'}
];

var Dish = React.createClass({
  render: function () {
    return (
      <div className="dish">
        <div className="dishName">{this.props.data.name}</div>
        <div className="dishLikes">{this.props.data.likes_count}</div>
      </div>
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
      <div className="dishList">
        {DishNodes}
      </div>
    );
  }
});

var DishBox = React.createClass({
  render: function () {
    return (
      <div className="dishesBox">
        <h1>List</h1>
        <DishList data={this.props.data}/>
      </div>
    );
  }
});

React.render(
  <DishBox data={dish_data}/>,
  document.getElementById('myDiv')
);