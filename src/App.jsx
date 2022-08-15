import stl from './App.module.scss'
import Tasks from "./components/Tasks/Tasks"
import TaskForm from "./components/TaskForm/TaskForm"
import {useEffect, useState} from "react"
import { AppContext } from "./context"

function App() {

  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTask, setSelectedTask] = useState({
    task: undefined,
    isEdited: false,
    isAdded: false,
  })
  const [editedTaskPrevData, setEditedTaskPrevData] = useState(undefined)
  const [maxID, setMaxID] = useState(0)

  const getTasks = async () => {
    setIsLoading(true)

    const response = await fetch('https://api.jsonbin.io/v3/b/62f42bce5c146d63ca685ddd/latest', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-Access-Key': '$2b$10$Tbu56u.eDqBYkgSOU6.09.YElp/FnVVX/QAY8x6vsSMaj1rnTmuPS', //S
        'X-Bin-Meta': 'false'
      }
    })

    if (response.ok) {
      const tasksObj = await response.json()
      await setTasks(tasksObj.tasks)
    } else {
      const error = new Error(`${response.status} - ${response.statusText}`)
      console.error(error)
    }

    setIsLoading(false)
  }

  // ~ componentDidMount
  useEffect(() => {getTasks()}, [])

  useEffect(() => {
    setMaxID(tasks.reduce((prevID, task) => {
      return prevID < task.id ? task.id : prevID
    }, 0))
  }, [tasks])

  // callback for editing current task
  const editTask = (taskData, taskID) => {
    if (taskID) { // if the id of the required task is passed
      // set new value of state with current task
      setSelectedTask({
        // filter required task from tasks array by the passed id
        task: tasks.filter(task => task.id === taskID)[0],
        isEdited: true
      })
    } else {
      // else set only "isEdited" param
      setSelectedTask(prevState => {
        return {...prevState, isEdited: true}
      })
    }
    setEditedTaskPrevData(taskData)
  }

  // callback for deleting current task
  const deleteTask = (taskID) => {
    // return an array without deleted task
    if (taskID) { // if the id of the required task is passed
      setTasks(tasks => { // filter tasks by the passed id
        return tasks.filter(task => task.id !== taskID)
      })
    } else {
      setTasks(tasks => { // filter tasks by task id in selectedTask
        return tasks.filter(task => task.id !== selectedTask.task.id)
      })
    }
    // set default state to selectedTask
    setSelectedTask({
      task: undefined,
      isEdited: false
    })
  }

  const addTask = () => {
    setSelectedTask({
      task: {
        id: +maxID + 1,
        name: '',
        description: '',
        date: '',
        time: '',
        status: 'waiting'
      },
      isEdited: true,
      isAdded: true,
    })
  }

  return (
    <div className={ stl.wrapper }>
      <AppContext.Provider value={{ tasks }}>
        <Tasks
          // tasks={ tasks }
          setTasks={ setTasks }
          selectedTask={ selectedTask }
          setSelectedTask = { setSelectedTask }
          isLoading={ isLoading }
          editCallback={ editTask }
          deleteCallback={ deleteTask }
          addTaskCallback={ addTask }
        />
        <TaskForm
          isLoading={ isLoading }
          setTasks={ setTasks }
          selectedTask={ selectedTask }
          setSelectedTask={ setSelectedTask }
          editedTaskPrevData={ editedTaskPrevData }
          setEditedTaskPrevData={ setEditedTaskPrevData }
          editCallback={ editTask }
          deleteCallback={ deleteTask }
          maxID={ maxID }
        />
      </AppContext.Provider>
    </div>
  );
}

export default App;
