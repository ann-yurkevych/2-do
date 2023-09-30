import './App.css';
import AddButton from './components/AddButton';
import { useState } from 'react';
import TaskList from './components/TaskList';

let nextId = 2;

let initialTasks = [
  {
    id: 0,
    title: 'Make lunch',
    done: false
  },
  {
    id: 1,
    title: 'Go shopping',
    done: false
  }
];

function App() {
  let localstorageTasks = [];
  if (localStorage.getItem('tasks')) {
    JSON.parse(localStorage.getItem('tasks')).forEach(task => {
      localstorageTasks.push(task);
    });
  }
  else {
    localstorageTasks = null;
  }
  initialTasks = localstorageTasks || initialTasks;

  function sortTasks(tasks) {
    tasks.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      else if (a.id > b.id) {
        return 1;
      }
      else {
        return 0;
      }
    });
  }
  sortTasks(initialTasks);
  nextId = localStorage.getItem('nextId') || nextId;
  //localStorage.clear();
  const [tasks, setTasks] = useState(initialTasks);

  function swapTasks(id1, id2) {
    let resTasks = [...tasks];

    let i1 = resTasks.findIndex(x => x.id == id1);
    let i2 = resTasks.findIndex(x => x.id == id2);

    const id = resTasks[i1].id;
    resTasks[i1].id = resTasks[i2].id;
    resTasks[i2].id = id;

    sortTasks(resTasks);

    setTasks(
      resTasks
    );
    localStorage.setItem('tasks', JSON.stringify(resTasks));
  }

  function handleAddTask(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    console.log(formJson.taskTime);

    if (formJson.taskText === '' || !formJson.taskText) {
      formJson.taskText = 'Do something';
    }
    let resTasks = [
      ...tasks,
      {
        id: nextId++,
        title: formJson.taskText,
        done: false
      }
    ]
    setTasks(
      resTasks
    );
    localStorage.setItem('tasks', JSON.stringify(resTasks));
    localStorage.setItem('nextId', nextId);
  }

  function handleDeleteTask(taskId) {
    var remainingTasks = tasks.filter(t => t.id !== taskId);
    setTasks(
      remainingTasks
    );
    localStorage.setItem('tasks', JSON.stringify(remainingTasks));
  }

  return (
    <div className="App">
      <div className='headerAndTaskListContainer'>
        <header className="App-header">
          <AddButton
            handleSubmit={handleAddTask}
          />
        </header>

        <TaskList tasks={tasks}
          onDelete={handleDeleteTask}
          swapTasks={swapTasks} />
      </div>
    </div>
  );
}

export default App;
