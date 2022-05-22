import React from "react";

class ClassCounter extends React.Component {

    // this - чтобы обратиться к каким-то свойствамсвойствам необходимо использовать this т.к. мы находимся внутри класса

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        // контекст компонента теряется и в эти функции этот контекст необходимо забиндить
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    //посколько мы работаем внутри класса function перед increment можно не писать
    increment() {
        this.setState({count: this.state.count + 1})
    }

    decrement() {
        this.setState({count: this.state.count - 1})
    }

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        )
    }
}

export default ClassCounter;