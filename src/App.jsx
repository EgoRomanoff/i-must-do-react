import stl from './App.module.scss'
import Tasks from "./components/Tasks/Tasks"
import TaskForm from "./components/TaskForm/TaskForm"
import {useEffect, useState} from "react"

function App() {

  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTask, setSelectedTask] = useState({
    task: undefined,
    isEdited: false
  })

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
  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className={ stl.wrapper }>
      <Tasks
        tasks={ tasks }
        setTasks={ setTasks }
        setSelectedTask = { setSelectedTask }
        isLoading={ isLoading }
      />
      <TaskForm
        isLoading={ isLoading }
        selectedTask={ selectedTask }
      />
    </div>
  );
}

export default App;
