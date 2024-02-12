import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  const addTask = () => {
    if (!text) {
      alert('Please add a task');
      return;
    }
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, text, date, completed: false };
    setTasks([...tasks, newTask]);
    setText('');
    setDate('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Task Tracker</h1>
        <div className="add-form">
          <input type="text" placeholder="Task" value={text} onChange={(e) => setText(e.target.value)} className="form-control" />
          <input type="text" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" />
          <button onClick={addTask} className="btn">Add Task</button>
        </div>
      </header>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`} onDoubleClick={() => toggleCompletion(task.id)}>
            <div className="task-text">
              <input type="checkbox" checked={task.completed} onChange={() => toggleCompletion(task.id)} />
              <h3>{task.text}</h3>
            </div>
            <p>{task.date}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No tasks to show</p>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
