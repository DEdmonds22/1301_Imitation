const React = require('react');

const New = () => {
    return (
        <div>
            <h1>New Fruit page</h1>
            {/* action will be the route, method will be the HTTP verb (GET, PUT, POST, DELETE) */}
            <form action='/fruits' method='POST'>   {/* POST - Create*/}
                Name: <input  type='text' name='name' /><br />
                Color: <input type='text' name='color' /><br />
                Is Ready To Eat: <input type='checkbox' name='readyToEat' /><br />
                <input type='submit' name='' value="Create Fruit" />
            </form>
        </div>
    )
}

module.exports = New;