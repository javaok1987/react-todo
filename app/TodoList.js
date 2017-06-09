import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

class TodoItem extends Component {

  constructor() {
    super();
    this.state = {
      isEditable: false,
      inputValue: '',
    };
  }

  renderControlButtons(){
    let { task, onSaveClick } = this.props;
    let { isEditable, inputValue} = this.state;

    const updateTask = ()=> {
      onSaveClick(inputValue);
      this.setState({ isEditable: false });
    }

    return isEditable ?
    (<span>
        <button onClick = {updateTask}> Save </button>
        <button onClick = {() => this.setState({isEditable: false})}> Cancel </button>
    </span>)
    : (
      <span>
        <button onClick = {() => this.setState({isEditable: true, inputValue: task.title})}> Edit </button>
      </span>
    )
  }

  renderInput() {
    let { inputValue } = this.state;
    return (
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          if (e.target.value && e.target.value.length <= 20) {
            this.setState({
              inputValue: e.target.value,
            });
          }
        }}
      />
    )
  }

  render() {
    let { onRemoveClick, onCompletClick, task } = this.props;
    let { isEditable } = this.state;

    return (
      <li>
        <span
          className={task.completed?"taskLabel completed":"taskLabel"}
          onClick={onCompletClick}>
          {task.title}
        </span>
        {isEditable && this.renderInput()}
        <div className="buttonGroup">
          {this.renderControlButtons()}
          <button onClick={onRemoveClick}>Del</button>
        </div>
      </li>
    )
  }
}


class TodoList extends Component {

  constructor(props) {

    super(props);

    this.state = {
      tasks: [
        {
          title: 'task 1',
          completed: false
        }, {
          title: 'task 2',
          completed: false
        }, {
          title: 'task 3',
          completed: false
        }
      ],
      newTask: '',
      isEditable: false
    }
  }

  /**
   * Handling Multiple Inputs.
   * https://facebook.github.io/react/docs/forms.html#handling-multiple-inputs
   * @param {*} event
   */
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value.trim()
    });
  }

  handleAddClick(id) {
    let { newTask, tasks } = this.state;

    if(!newTask){
      return false;
    }

    tasks.push({
      title: newTask,
      completed: false
    });

    this.setState({
      tasks: tasks,
      newTask: ''
    });
  }

  handleSaveClick(id, newTask) {
    this.state.tasks[id].title = newTask;
    this.setState({
      tasks: this.state.tasks,
    });
  }

  handleRemoveClick(id){
    this.state.tasks.splice(id, 1);
    this.setState({
      tasks: this.state.tasks
    });
  }

  handleCompletClick(id) {
    let {tasks} = this.state;
    tasks[id].completed = !tasks[id].completed;
    this.setState({
      tasks: this.state.tasks,
    });
  }

  render() {
    return (
      <div className="todo-list">
        <div>
          <ul>
            {this.state.tasks.map((todo, id) =>
              <TodoItem
                key={id}
                onRemoveClick={this.handleRemoveClick.bind(this, id)}
                onSaveClick={this.handleSaveClick.bind(this, id)}
                onCompletClick={this.handleCompletClick.bind(this, id)}
                task={todo} />
            )}
          </ul>
        </div>
        <div className="todo-footer">
          <input
            type="text"
            name="newTask"
            value={this.state.newTask}
            onChange={this.handleChange.bind(this)} />
          <button onClick={this.handleAddClick.bind(this)}>
            Add todo
          </button>
        </div>
      </div>
    );
  }

}

TodoList.propTypes = {
  newTask: PropTypes.string,
  task:PropTypes.array,
};

export default TodoList;
