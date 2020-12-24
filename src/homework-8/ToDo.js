import React, {Component} from "react";

export default class ToDo extends Component {

    state = {
        tasks: [],
        newTask: "",
    }

    handleChange = ({target: {value}}) => {
        this.setState({newTask: value});
    }

    handleClick = () => {
        const {tasks, newTask} = this.state;
        this.setState({
            tasks: [...tasks, newTask],
            newTask: "",
        });
    }

    render() {
        const {tasks, newTask} = this.state;
        const li = tasks.map((task, index) => <li key={index}>{task}</li>);
        return (
            <div>
                <input value={newTask} onChange={this.handleChange}/>
                <button type="button" onClick={this.handleClick}>Add</button>
                <ul>
                    {li}
                </ul>
            </div>
        )
    }
}
