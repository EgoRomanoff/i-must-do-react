import stl from './TaskList.module.scss'
import TaskItem from "../TaskItem/TaskItem"
import {useContext, useState} from "react"
import { AppContext } from '../../context'

function TaskList({
	                  taskList,
	                  setTasks,
	                  setSelectedTask,
	                  editCallback,
	                  deleteCallback,
                    searchResult
}) {

	const { tasks } = useContext(AppContext)
	// console.log(tasks)
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

	// render task items of task list
	const renderTaskList = () => {
		// choose data source
		// if searchResult is present - choose it,
		// else - choose taskList
		let dataSource = searchResult || tasks
		// if data source is not empty
		if (dataSource.length) {
			// return new array with parsed data
			return dataSource.map(task => {
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
			// else return an empty screen
			return <span className={ stl.empty }>Задач нет</span>
		}
	}

	return (
		<ul className={ stl.wrapper }>
			{ renderTaskList() }
		</ul>
	)
}

export default TaskList