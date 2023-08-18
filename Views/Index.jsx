const React = require('react');

const Index = ({fruits}) => {
    return (
        <div>
            <h1>Fruits Index Page</h1>
            <nav>
                <a href='/fruits/new'>Create a New Fruit</a>
            </nav>
            <ul>
                {fruits.map((fruits, i) => {
                    return (
                        <li key={i}>
                            The{' '}
                            <a href={`/fruits/${i}`}>{fruits.name}</a>{' '} is {fruits.color} <br></br>{fruits.readyToEat ? ' It is ready to eat' : 'It is not ready to eat'} <br />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

module.exports = Index;