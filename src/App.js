import { useState, useEffect } from "react";
import {TaskRow} from './components/TaskRow';
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";

function App() {

  const [userName, setUserName] = useState('Angelo');
  const [taskItems, setTaskItems] = useState([
    {name: 'Taks One', done: false},
    {name: 'Taks Two', done: false},
    {name: 'Taks Three', done: true},
    {name: 'Taks Four', done: false},
  ]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data != null){
      setTaskItems(JSON.parse(data))
    }else{
      setUserName('Angelo');
      setTaskItems([
        {name: 'Taks One', done: false},
        {name: 'Taks Two', done: false},
        {name: 'Taks Three', done: true},
        {name: 'Taks Four', done: false},
      ])
      setShowCompleted();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems]);

  function createNewTask(taskName){
    if(!taskItems.find(t => t.name === taskName)){
      setTaskItems([...taskItems, {name: taskName, done: false}])
    }
  }
  
  const toggleTask = task =>
    setTaskItems(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t)))

  const taskTableRows = (doneValue) => 
    taskItems.filter(task => task.done === doneValue).map(task => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask}/>
    ))
  

  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems}/>
      <TaskCreator callback={createNewTask}/>
      <table className="table table-striped table-border">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>
      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl description="Completed tasks" isChecked={showCompleted} callback={checked => setShowCompleted(checked)}/>
      </div>
      {
        showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;
