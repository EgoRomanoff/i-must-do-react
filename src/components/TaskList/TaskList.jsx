import stl from './TaskList.module.scss'
import TaskItem from "../TaskItem/TaskItem"
import {useState} from "react"

function TaskList({ tasks, setTasks, setSelectedTask, editCallback, deleteCallback }) {

	// state for current selected task id
	const [selectedID, setSelectedID] = useState()

	// callback for setting selected task
	const selectTask = (task) => {
		setSelectedTask({
			task: task,
			isEdited: false
		})
		setSelectedID(task.id)
	}

	const isTasksEmpty = () => {
		if (tasks.length) {
			return tasks.map(task => {
				return (
					<TaskItem
						key={ task.id }
						task={ task }
						setTasks={ setTasks }
						editCallback={ editCallback }
						deleteCallback={ deleteCallback }
						selectTaskCallback={ selectTask }
						selectedID={ selectedID }
					/>
				)
			})
		} else {
			return <span className={ stl.empty }>Задач нет</span>
		}
	}

	return (
		<ul className={ stl.wrapper }>
			{ isTasksEmpty() }
		</ul>
	)
}

export default TaskList