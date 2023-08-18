const React = require('react');

const Show = (props) => {
    return (
        <div>
            <h1>Show Page</h1>
            {/* access the data in the view*/}
            The {props.fruit.name} is  {props.fruit.color} 
            {props.fruit.readyToEat ? ' is ready to eat' : ' is not ready to eat... Cant touch this'}
        </div>
    );
};

module.exports = Show;