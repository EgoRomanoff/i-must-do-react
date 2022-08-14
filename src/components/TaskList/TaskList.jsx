import stl from './TaskList.module.scss'
import TaskItem from "../TaskItem/TaskItem"

function TaskList({ tasks, setTasks, setSelectedTask, editCallback, deleteCallback }) {

	const isTasksEmpty = () => {
		if (tasks.length) {
			return tasks.map(task => {
				return (
					<TaskItem
						key={ task.id }
						task={ task }
						setTasks={ setTasks }
						setSelectedTask={ setSelectedTask }
						editCallback={ editCallback }
						deleteCallback={ deleteCallback }
					/>
				)
			})
		} else {
			return <span className={ stl.empty }>Задач нет</span>
		}
	}

	// const selectTask = e => {
	// 	e.stopPropagation()
	// 	setSelectedTask({
	// 		task: task,
	// 		isEdited: false
	// 	})
	// 	e.currentTarget.parentNode.classList.toggle(`${stl.selected}`)
	// }

	return (
		<ul className={ stl.wrapper }>
			{ isTasksEmpty() }
		</ul>
	)
}

export default TaskList