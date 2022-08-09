import stl from './App.module.scss'
import Tasks from "./components/Tasks/Tasks"
import TaskForm from "./components/TaskForm/TaskForm"

function App() {

  return (
    <div className={ stl.wrapper }>
      <Tasks/>
      <TaskForm/>
    </div>
  );
}

export default App;
