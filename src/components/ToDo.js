import React, {Component} from "react";
import styles from './ToDo.module.css';


const generateId = () => {
    let id = 0;
    return (() => id += 1);
}
let uniqueId = generateId();


const VIEWS = {
    all: 'all',
    active: 'unCompleted',
    completed: 'completed',
};

export default class ToDo extends Component {

    state = {
        tasks: [],
        newTask: {
            value: "",
            checked: false,
            id: uniqueId(),
            isEdit: false,
        },
        draftValue: "",
        showInputs: "All",
    }
    handleChange = ({target: {value}}) => {
        const {tasks, newTask} = this.state;
        this.setState({newTask: {...newTask, value: value}}, () => console.log(newTask));
    }

    handleClick = () => {
        const {tasks, newTask} = this.state;

        if (newTask.value.trim()) {
            this.setState({
                tasks: [...tasks, newTask],
                newTask: {...newTask, value: "", id: uniqueId()},
            }, () => console.log(this.state));
        }
    }
    handleRemove = (uid) => {
        const {tasks} = this.state;
        const filteredTasks = tasks.filter(({id}) => (id !== uid));
        this.setState({tasks: filteredTasks}, () => console.log(tasks));

    }
    handleChecked = (uid) => {

        const {tasks} = this.state;
        const changedTasks = tasks.map((task) => {
            if (task.id === uid) {
                return ({...task, checked: !task.checked});

            }
            return task;
        });
        this.setState({tasks: changedTasks});
    }


    handleStatus = (status) => {

        this.setState({showInputs: status});

    }
    handleChangeEdit = (uid) => {
        const {tasks} = this.state;
        const changedTasks = tasks.map(task => {
            if (uid === task.id) {
                return {...task, isEdit: true};
            }
            return task;
        })
        this.setState({tasks: changedTasks});

    }
    handleChangeInput=(e)=>{
      this.setState({draftValue:e.target.value});
    }

    handleSave = (uid)=>{
        const {tasks, draftValue}= this.state;
        const changedTasks = tasks.map(task => {
            if (uid === task.id) {
                return {...task, value: draftValue, isEdit:false};
            }
            return task;
        })
        this.setState({tasks:changedTasks, draftValue: "", });
    }

    render() {
        let {tasks, newTask, showInputs} = this.state;
        if (showInputs === 'unCompleted') {
            tasks = tasks.filter(task => !task.checked)
        } else if (showInputs === 'completed') {
            tasks = tasks.filter(task => task.checked)
        }
        const li = tasks.map((task, index) => {
            if (!task.isEdit) {
                return (<li key={task.is} className={styles.li}>
                    <input type='checkbox' onClick={() => this.handleChecked(task.id)} className={styles.checkbox}/>
                    <span className={task.checked ? `${styles.spanCompleted} ${styles.span}` : `${styles.span}`}
                          onClick={() => this.handleChangeEdit(task.id)}>
                {task.value}
            </span>
                    <img src="https://img.icons8.com/material-outlined/24/000000/trash.png"
                         width="25px" className={styles.img} onClick={(e) => this.handleRemove(task.id, e)}
                    />
                </li>)
            }
            return (
                <li key={task.id}>
                    <input onChange={this.handleChangeInput}/>
                    <button onClick = {()=>this.handleSave(task.id)}>Save</button>
                </li>
            )
        });
        return (
            <div>
                <input value={newTask.value} onChange={this.handleChange}/>
                <button type="button" onClick={this.handleClick}>Add</button>
                <ul>
                    {li}
                </ul>
                <ul>
                    {(Object.values(VIEWS)).map((view) => {
                        return (<button onClick={() => this.handleStatus(view)}>{view}</button>)
                    })}
                </ul>

            </div>
        )
    }
}
